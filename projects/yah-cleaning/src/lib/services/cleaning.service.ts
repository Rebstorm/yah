import {Injectable} from '@angular/core';
import {combineLatest, Observable,} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {filter, map, switchMap, tap, timeout,} from 'rxjs/operators';
import {CleaningStatus} from '../types/cleaning-status';
import {StorageMap} from '@ngx-pwa/local-storage';
import {HotToastService} from '@ngneat/hot-toast';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CleaningService {
  public isActivated$: Observable<boolean>;
  public serverUrl$: Observable<string | undefined>;
  public status$: Observable<CleaningStatus>;

  private iRobotURL;

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
        if (!isActivated) {
          return;
        }

        if (isActivated === undefined || res === undefined) {
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
      }),
      tap((res) => (this.iRobotURL = res))
    );

    this.status$ = this.serverUrl$.pipe(
      filter((serverUrl) => !!serverUrl),
      switchMap((serverUrl) => {
        return this.http
          .get<CleaningStatus>(`http://${serverUrl}/api/local/info/mission`);
      })
    );
  }

  public checkiRobotServer(ip: string): Observable<HttpResponse<any>> {
    let formattedIp = ip.replace('http://', '');
    formattedIp = formattedIp.replace('/api/local/info/mission', '');
    formattedIp = formattedIp.replace('/', '');
    return this.http
      .get<HttpResponse<any>>(`http://${formattedIp}/api/local/info/mission`, {
        observe: 'response',
      })
      .pipe(timeout(3000));
  }

  public startRobot(): Observable<boolean> {
    return this.http
      .get(`http://${this.iRobotURL}/api/local/action/start`, { observe: 'response' })
      .pipe(map((response) => !!response.status));
  }

  public stopRobot(): Observable<boolean> {
    return this.http
      .get(`http://${this.iRobotURL}/api/local/action/stop`, { observe: 'response' })
      .pipe(map((response) => !!response.status));
  }

  public saveiRobotIp(input: string): Observable<null> {
    return this.localDb.set(this.IROBOT_SERVER_URL_KEY, input, {
      type: 'string',
    });
  }

  public saveActivated(isActivated: boolean): Observable<null> {
    return this.localDb.set(this.IROBOT_IS_ACTIVATED_KEY, isActivated, {
      type: 'boolean',
    });
  }
}
