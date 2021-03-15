import { Injectable } from '@angular/core';
import { concat, EMPTY, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, map, repeat, switchMap, take, timestamp } from 'rxjs/operators';
import { YrNoWeatherForecast } from '../types/yr-no-weather-forecast';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  public getCurrentWeatherInformation(): Observable<YrNoWeatherForecast> {
    return this.http
      .get<YrNoWeatherForecast>(
        'https://api.met.no/weatherapi/locationforecast/2.0/compact?altitude=69&lat=50.8106855&lon=7.1414209'
      )
      .pipe(
        timestamp(),
        switchMap(({ timestamp: ts, value: value }) =>
          concat(of(value), EMPTY.pipe(delay(this.timeToNextHourInMs(ts))))
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
}
