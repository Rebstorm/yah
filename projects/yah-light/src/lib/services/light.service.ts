import { Injectable } from '@angular/core';
import {
  combineLatest,
  concat,
  empty,
  EMPTY,
  merge,
  Observable,
  of,
} from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {
  debounceTime,
  delay,
  expand,
  filter,
  map,
  repeat,
  repeatWhen,
  switchMap,
  take,
  takeLast,
  takeWhile,
  tap,
  timeout,
  timestamp,
} from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Url } from 'url';
import { UrlResolver } from '@angular/compiler';

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
  public validHueBridgeIp: Observable<boolean>;
  public isAuthenticated$: Observable<boolean>;
  public turnOffAllLights$: Observable<string>;
  public hueBridgeIp: Observable<string>;

  private username: string;
  private hueBridgeUrl: string;

  private readonly HUE_USERNAME_KEY = 'HUE_USERNAME';
  private readonly HUE_URL_KEY = 'HUE_URL';
  constructor(
    private http: HttpClient,
    private localDb: StorageMap,
    private router: Router,
    private toastMessage: HotToastService
  ) {
    this.hueBridgeIp = localDb
      .get(this.HUE_URL_KEY, { type: 'string' })
      .pipe(tap((res) => (this.hueBridgeUrl = res)));

    this.validHueBridgeIp = this.hueBridgeIp.pipe(
      map((res) => (res ? true : false))
    );

    this.isAuthenticated$ = combineLatest([
      localDb.get<boolean>(this.HUE_USERNAME_KEY, { type: 'string' }),
      this.validHueBridgeIp,
    ]).pipe(
      map(([username, validIP]) => {
        if (!validIP) {
          this.toastMessage.error(
            'Keine Einstellungen gefunden! Bitte Konfigurieren.',
            {
              style: {
                background: 'rgba(255, 255, 255, 0.8)',
              },
              dismissible: true,
              ariaLive: 'polite',
            }
          );
          this.router.navigate(['setup']).then();
          return;
        }
        return username;
      }),
      tap((localIndexDb) => {
        this.username = localIndexDb;
      }),
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
        this.http.get<JSON>(`${this.hueBridgeUrl}/${this.username}/lights`)
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
            .put(
              `${this.hueBridgeUrl}/${this.username}/lights/${light}/state`,
              {
                on: false,
              }
            )
            .pipe(take(1))
            .subscribe()
        );

        return 'ok';
      })
    );
  }

  private registerAppToBridge(): Observable<boolean> {
    // TODO: incase of adding another screen, make this more dynamic
    const query = this.http
      .post<HueInternalModel[]>(
        this.hueBridgeUrl,
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

    return query;
  }

  public checkHueBridgeIp(ip: string): Observable<HttpResponse<any>> {
    let formattedIp = ip.replace('http://', '');
    formattedIp = formattedIp.replace('/api', '');
    formattedIp = formattedIp.replace('/', '');
    return this.isIp(formattedIp)
      ? this.http
          .get<HttpResponse<any>>(`http://${formattedIp}/api/randomResource`, {
            observe: 'response',
          })
          .pipe(timeout(3000))
      : empty();
  }

  isIp(ipaddress: string) {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipaddress
      )
    ) {
      return true;
    }
    return false;
  }

  public saveHueBridgeIp(ip: string): Observable<null> {
    console.log('saving..');
    let formattedIp = ip.replace('http://', '');
    formattedIp = formattedIp.replace('/api', '');
    formattedIp = formattedIp.replace('/', '');

    return this.localDb.set(this.HUE_URL_KEY, `http://${formattedIp}/api`, {
      type: 'string',
    });
  }
}
