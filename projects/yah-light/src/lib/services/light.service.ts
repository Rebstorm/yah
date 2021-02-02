import {Injectable} from '@angular/core';
import {combineLatest, concat, EMPTY, merge, Observable, of} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {delay, filter, map, repeat, switchMap, take, tap, timeout, timestamp,} from 'rxjs/operators';
import {StorageMap} from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

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
  validHueBridgeIp: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;
  turnOffAllLights$: Observable<string>;

  private username: string;
  private hueBridgeUrl: string;

  private readonly HUE_USERNAME_KEY = 'HUE_USERNAME';
  private readonly HUE_URL_KEY = 'HUE_URL';
  constructor(private http: HttpClient, private localDb: StorageMap, private router: Router) {

    this.validHueBridgeIp = localDb.get(this.HUE_URL_KEY, { type: 'string' }).pipe(
      map( res => res ? true : false),
    );

    this.isAuthenticated$ = 
    combineLatest([  localDb
      .get<boolean>(this.HUE_USERNAME_KEY, { type: 'string' }), this.validHueBridgeIp])
      .pipe(
        map((username, validIP) => {
          if(!validIP){
            this.router.navigate(['setup']).then()
            return;
          }
          return username;
        }),
        tap(([localIndexDb, nothing]) => (this.username = localIndexDb)),
        map((localIndexDb) => {
          return localIndexDb ? true : false;
        }),
        switchMap((isAuthenticated) => {
          return isAuthenticated ? of(true) : this.registerAppToBridge();
        })
      )

   
      .pipe(
       
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
            .put(`${this.hueBridgeUrl}/${this.username}/lights/${light}/state`, {
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
  }

  public checkHueBridgeIp(ip: string): Observable<HttpResponse<any>>{
    return this.http.get<HttpResponse<any>>(`http://${ip}/api/randomResource`,  {observe: 'response'}).pipe(timeout(3000));
  }

  public saveHueBridgeIp(ip: string): Observable<null>{
    return this.localDb.set(this.HUE_URL_KEY, ip, { type: 'string' });
  }
}
