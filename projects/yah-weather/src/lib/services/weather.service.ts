import { Injectable } from '@angular/core';
import { concat, EMPTY, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, map, repeat, switchMap, take, timestamp } from 'rxjs/operators';
import { YrNoWeatherForecast } from '../types/yr-no-weather-forecast';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private geoLocation: Observable<GeolocationPosition>;

  constructor(private http: HttpClient) {
    this.geoLocation = new Observable<GeolocationPosition>((subscriber) => {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((geolocation) => {
          subscriber.next(geolocation);
          subscriber.complete();
        });
      } else {
        subscriber.error('Unsupported browser');
      }
    });
  }

  getCurrentWeatherInformation(): Observable<YrNoWeatherForecast> {
    return this.geoLocation.pipe(
      take(1),
      switchMap((geoLocation) => {
        return this.http.get<YrNoWeatherForecast>(
          `https://api.met.no/weatherapi/locationforecast/2.0/compact?altitude=0&lat=${geoLocation.coords.latitude.toString()}&lon=${geoLocation.coords.longitude.toString()}`
        );
      }),
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
