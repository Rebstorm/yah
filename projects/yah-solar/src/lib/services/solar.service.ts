import { Injectable } from '@angular/core';
import { combineLatest, concat, EMPTY, NEVER, Observable, of } from 'rxjs';
import { delay, map, repeat, switchMap, timestamp } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SolarEdgePowerFlow } from '../types/solar.edge.power.flow';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root',
})
export class SolarService {
  public currentPower$: Observable<SolarEdgePowerFlow>;
  public isActivated$: Observable<boolean>;
  public siteId: Observable<string | undefined>;
  public apiKey: Observable<string | undefined>;

  private internalSiteId = 'site';
  private internalApiKey = 'apiKey';

  private BASE_URL = 'https://monitoringapi.solaredge.com/site';

  private SOLAR_IS_ACTIVATED_KEY = 'SOLAR_EDGE_ACTIVATED';
  private SOLAR_SITE_ID_KEY = 'SOLAR_EDGE_SITE_ID';
  private SOLAR_SITE_API_KEY = 'SOLAR_EDGE_API_KEY';



  constructor(private http: HttpClient, private localDb: StorageMap) {
    this.isActivated$ = this.localDb
      .get(this.SOLAR_IS_ACTIVATED_KEY, { type: 'boolean' })
      .pipe(
        map((isActivated) => (isActivated === undefined ? false : isActivated))
      );

    this.siteId = this.localDb.watch(this.SOLAR_SITE_ID_KEY, {
      type: 'string',
    });
    this.apiKey = this.localDb.watch(this.SOLAR_SITE_API_KEY, {
      type: 'string',
    });

    this.currentPower$ = combineLatest([
      this.localDb.watch(this.SOLAR_IS_ACTIVATED_KEY, { type: 'boolean' }),
      this.localDb.watch(this.SOLAR_SITE_ID_KEY, { type: 'string' }),
      this.localDb.watch(this.SOLAR_SITE_API_KEY, { type: 'string' }),
    ]).pipe(
      map(([activated, siteId, apiKey]) => {
        if (activated) {
          this.internalSiteId = siteId;
          this.internalApiKey = apiKey;
          return siteId !== undefined && apiKey !== undefined;
        }
        return false;
      }),
      switchMap((shouldRequest) => {
        return shouldRequest
          ? this.http
              .get<SolarEdgePowerFlow>(
                `${this.BASE_URL}/${this.internalSiteId}/currentPowerFlow.json`,
                {
                  params: {
                    api_key: this.internalApiKey,
                  },
                }
              )
              .pipe(
                timestamp(),
                switchMap(({ timestamp: ts, value: value }) =>
                  // update every 10 min.
                  concat(of(value), EMPTY.pipe(delay(600000)))
                ),
                repeat()
              )
          : NEVER;
      })
    );
  }

  public setActivated(isActivated: boolean): Observable<null> {
    return this.localDb.set(this.SOLAR_IS_ACTIVATED_KEY, isActivated, {
      type: 'boolean',
    });
  }

  setSiteId(value: string): Observable<null> {
    return this.localDb.set(this.SOLAR_SITE_ID_KEY, value, {
      type: 'string',
    });
  }

  setApiKey(value: string): Observable<null> {
    return this.localDb.set(this.SOLAR_SITE_API_KEY, value, {
      type: 'string',
    });
  }
}
