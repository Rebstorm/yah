import { Injectable } from '@angular/core';
import { concat, EMPTY, NEVER, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, map, repeat, switchMap, take, timestamp } from 'rxjs/operators';
import { YrNoWeatherForecast } from '../types/yr-no-weather-forecast';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public activated$: Observable<boolean>;
  public longitude$: Observable<string>;
  public latitude$: Observable<string>;

  private WEATHER_ACTIVATED_KEY = 'WEATHER_ACTIVATED';
  private WEATHER_LONGITUDE_KEY = 'WEATHER_LONGITUDE';
  private WEATHER_LATITUDE_KEY = 'WEATHER_LATITUDE';

  constructor(private http: HttpClient, private localDb: StorageMap) {
    this.activated$ = localDb
      .watch(this.WEATHER_ACTIVATED_KEY, {
        type: 'boolean',
      })
      .pipe(
        map((isActivated) => (isActivated === undefined ? false : isActivated))
      );

    this.longitude$ = localDb.watch(this.WEATHER_LONGITUDE_KEY, {
      type: 'string',
    });

    this.latitude$ = localDb.watch(this.WEATHER_LATITUDE_KEY, {
      type: 'string',
    });
  }

  public getCurrentWeatherInformation(): Observable<YrNoWeatherForecast | undefined>  {
    return this.activated$.pipe(
      switchMap((isActivated) => {
        return isActivated
          ? this.http.get<YrNoWeatherForecast>(
            'https://api.met.no/weatherapi/locationforecast/2.0/compact?altitude=69&lat=50.8106855&lon=7.1414209'
          )
          : of(undefined);
      }),
      timestamp(),
      switchMap(({timestamp: ts, value: value}) => concat(of(value), EMPTY.pipe(delay(this.timeToNextHourInMs(ts))))
      ),
      repeat()
    );
  }

  private timeToNextHourInMs(currentTimestampMs: number): number {
    const timestampSeconds = currentTimestampMs / 1000;
    const numberOfSecondsIntoTheCurrentHour = timestampSeconds % 3600;
    const numberOfSecondsToTheNextHour =
      3600 - numberOfSecondsIntoTheCurrentHour;
    return numberOfSecondsToTheNextHour * 1000;
  }

  setActivated(checked: boolean): Observable<null> {
    return this.localDb.set(this.WEATHER_ACTIVATED_KEY, checked, {
      type: 'boolean',
    });
  }

  setLatitude(lat: string): Observable<null> {
    return this.localDb.set(this.WEATHER_LATITUDE_KEY, lat, {
      type: 'string',
    });
  }

  setLongitude(long: string): Observable<null> {
    return this.localDb.set(this.WEATHER_LONGITUDE_KEY, long, {
      type: 'string',
    });
  }
}
