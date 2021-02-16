import { Injectable } from '@angular/core';
import { concat, EMPTY, Observable, of } from 'rxjs';
import {
  delay,
  filter,
  map,
  repeat,
  switchMap,
  timestamp,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SolarEdgePowerFlow } from '../types/solar.edge.power.flow';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root',
})
export class SolarService {
  public currentPower$: Observable<SolarEdgePowerFlow>;
  public isActivated$: Observable<boolean>;

  private site = 'site';
  private apiKey = 'apiKey';

  private BASE_URL = 'https://monitoringapi.solaredge.com/site';

  private SOLAR_IS_ACTIVATED_KEY = 'SOLAR_EDGE_ACTIVATED';
  constructor(private http: HttpClient, private localDb: StorageMap) {
    this.isActivated$ = this.localDb
      .get(this.SOLAR_IS_ACTIVATED_KEY, { type: 'boolean' })
      .pipe(map((isAcvated) => (isAcvated === undefined ? false : isAcvated)));

    this.currentPower$ = this.http
      .get<SolarEdgePowerFlow>(
        `${this.BASE_URL}/${this.site}/currentPowerFlow.json`,
        {
          params: {
            api_key: this.apiKey,
          },
        }
      )
      .pipe(
        timestamp(),
        switchMap(({ timestamp: ts, value: value }) =>
          concat(of(value), EMPTY.pipe(delay(10000)))
        ),
        repeat()
      );
  }

  public setActivated(isActivated: boolean): Observable<null> {
    return this.localDb.set(this.SOLAR_IS_ACTIVATED_KEY, isActivated, {
      type: 'boolean',
    });
  }
}
