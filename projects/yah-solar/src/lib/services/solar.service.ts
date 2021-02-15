import { Injectable } from '@angular/core';
import {concat, EMPTY, Observable, of} from 'rxjs';
import {delay, filter, repeat, switchMap, timestamp} from 'rxjs/operators';
import {CleaningStatus} from '../../../../yah-cleaning/src/lib/types/cleaning-status';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SolarService {

  public currentPower$: Observable<object>;

  private site = 'siteId';
  private apiKey = 'apiKey';
  private BASE_URL = 'https://monitoringapi.solaredge.com/site/';


  constructor(private http: HttpClient) {

    this.currentPower$ = this.http
      .get(
        `${this.BASE_URL}/${this.site}/currentPowerFlow.json?api_key=${this.apiKey}`,
        {}
      )
      .pipe(
        timestamp(),
        switchMap(({ timestamp: ts, value: value }) =>
          concat(of(value), EMPTY.pipe(delay(100)))
        ),
        repeat()
      );
  }

}
