import { Injectable } from '@angular/core';
import { concat, EMPTY, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  delay,
  filter,
  map,
  repeat,
  switchMap,
  take,
  tap,
  timestamp,
} from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';
import { HueLampObject } from '../types/hue-lamp-object';

export interface HueInternalModel {
  error?: {
    type: number;
    address: string;
    description: string;
  };
  success?: {
    username: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LightService {
  isAuthenticated$: Observable<boolean>;
  turnOffAllLights$: Observable<string>;

  private username: string;

  private readonly HUE_USERNAME_KEY = 'HUE_USERNAME';
  private readonly HUE_URL = 'http://192.168.178.21/api';
  constructor(private http: HttpClient, private localDb: StorageMap) {
    this.isAuthenticated$ = localDb
      .get<boolean>(this.HUE_USERNAME_KEY, { type: 'string' })
      .pipe(
        tap((localIndexDb) => (this.username = localIndexDb)),
        map((localIndexDb) => {
          return localIndexDb ? true : false;
        }),
        switchMap((isAuthenticated) => {
          return isAuthenticated ? of(true) : this.registerAppToBridge();
        })
      );

    this.turnOffAllLights$ = this.isAuthenticated$.pipe(
      filter((isAuthenticated) => isAuthenticated === true),
      switchMap((auth) =>
        this.http.get<JSON>(`${this.HUE_URL}/${this.username}/lights`)
      ),
      map((getResult) => {
        const idList: string[] = [];
        for (const prop in getResult) {
          if (getResult.hasOwnProperty(prop)) {
            idList.push(prop);
          }
        }
        return idList;
      }),
      switchMap((lightIdList) => {
        lightIdList.forEach((light) =>
          this.http
            .put(`${this.HUE_URL}/${this.username}/lights/${light}/state`, {
              on: false,
            })
            .pipe(take(1))
            .subscribe()
        );

        return 'ok';
      })
    );
  }

  private registerAppToBridge(): Observable<boolean> {
    // TODO: incase of adding another screen, make this more dynamic
    return this.http
      .post<HueInternalModel[]>(
        this.HUE_URL,
        { devicetype: 'homescreen#homescreen_1' },
        {}
      )
      .pipe(
        map((res) => res.pop()),
        switchMap((res) => {
          if (res.success?.username) {
            this.username = res.success.username;
            this.localDb
              .set(this.HUE_USERNAME_KEY, res.success.username, {
                type: 'string',
              })
              .pipe(take(1))
              .subscribe();
            return of(true);
          } else {
            return of(false);
          }
        }),
        timestamp(),
        switchMap(({ timestamp: ts, value: value }) =>
          concat(of(value), EMPTY.pipe(delay(5000)))
        ),
        repeat()
      );
  }
}
