import { Injectable } from '@angular/core';
import {concat, EMPTY, Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {catchError, delay, filter, map, repeat, switchMap, take, timestamp} from 'rxjs/operators';

export interface HueInternalModel {
  error: {
    type: number;
    address: string;
    description: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LightService {
  isAuthenticated$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isAuthenticated$ = this.getHueBridge().pipe()
  }

  private getHueBridge(): Observable<boolean> {
    // TODO: incase of adding another screen, make this more dynamic
    return this.http
      .post<HueInternalModel[]>(
        'http://192.168.178.21/api/',
        { devicetype: 'homescreen#homescreen_test_1' },
        {}
      )
      .pipe(
        map((res) => res.pop()),
        map((res) => res.error.type !== 101),
        timestamp(),
        switchMap(({ timestamp: ts, value: value }) =>
          concat(of(value), EMPTY.pipe(delay(5000)))
        ),
        repeat()
      );
  }
}
