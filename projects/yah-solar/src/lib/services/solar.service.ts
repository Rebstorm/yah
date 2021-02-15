import { Injectable } from '@angular/core';
import { concat, EMPTY, Observable, of } from 'rxjs';
import { delay, repeat, switchMap, timestamp } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SolarEdgePowerFlow } from '../types/solar.edge.power.flow';

@Injectable({
  providedIn: 'root',
})
export class SolarService {
  public currentPower$: Observable<SolarEdgePowerFlow>;

  private site = 'site';
  private apiKey = 'apiKey';
  private BASE_URL = 'https://monitoringapi.solaredge.com/site';

  constructor(private http: HttpClient) {
    this.currentPower$ = this.http
      .get<SolarEdgePowerFlow>(
        `${this.BASE_URL}/${this.site}/currentPowerFlow.json`,
        {
          params: {
            api_key: this.apiKey,
          }
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
}
