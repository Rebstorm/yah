import { Injectable } from '@angular/core';
import {combineLatest, concat, empty, EMPTY, NEVER, Observable, of} from 'rxjs';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import {
  delay,
  map,
  repeat,
  switchMap,
  timeout,
  timestamp,
} from 'rxjs/operators';
import { CleaningStatus } from '../types/cleaning-status';
import { StorageMap } from '@ngx-pwa/local-storage';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CleaningService {
  public isActivated$: Observable<boolean>;
  public serverUrl$: Observable<string>;
  public status$: Observable<CleaningStatus>;

  private readonly IROBOT_IS_ACTIVATED_KEY = 'IROBOT_IS_ACTIVATED';
  private readonly IROBOT_SERVER_URL_KEY = 'IROBOT_SERVER_URL';

  constructor(
    private http: HttpClient,
    private localDb: StorageMap,
    private toastMessage: HotToastService,
    private router: Router
  ) {
    this.isActivated$ = this.localDb.get(this.IROBOT_IS_ACTIVATED_KEY, {
      type: 'boolean',
    });

    this.serverUrl$ = combineLatest([
      localDb.watch(this.IROBOT_SERVER_URL_KEY, { type: 'string' }),
      this.isActivated$,
    ]).pipe(
      map(([res, isActivated]) => {
        if (isActivated === undefined) {
          this.toastMessage.warning('Lass uns uns sachen erstmal einstellen ', {
            style: {
              background: 'rgba(255, 255, 255, 0.8)',
            },
            dismissible: true,
            ariaLive: 'polite',
          });
          this.router.navigate(['setup']).then();
          return;
        }
        return res;
      })
    );

    this.status$ = this.http
      .get<CleaningStatus>(`${this.serverUrl$}/api/local/info/mission`)
      .pipe(
        timestamp(),
        switchMap(({ timestamp: ts, value: value }) =>
          concat(of(value), EMPTY.pipe(delay(60000)))
        ),
        repeat()
      );
  }

  public checkiRobotServer(ip: string): Observable<HttpResponse<any>> {
    let formattedIp = ip.replace('http://', '');
    formattedIp = formattedIp.replace('/api/mission', '');
    formattedIp = formattedIp.replace('/', '');
    return this.isIp(formattedIp)
      ? this.http
          .get<HttpResponse<any>>(`http://${formattedIp}/api/randomResource`, {
            observe: 'response',
          })
          .pipe(timeout(3000))
      : empty();
  }

  private isIp(ipaddress: string): boolean {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipaddress
      )
    ) {
      return true;
    }
    return false;
  }

  public startRobot(): Observable<boolean> {
    return this.http
      .get(`${this.serverUrl$}/api/local/action/start`, { observe: 'response' })
      .pipe(map((response) => !!response.status));
  }

  stopRobot(): Observable<boolean> {
    return this.http
      .get(`${this.serverUrl$}/api/local/action/stop`, { observe: 'response' })
      .pipe(map((response) => !!response.status));
  }

  saveiRobotIp(input: string): Observable<null> {
    return NEVER;
  }
}
