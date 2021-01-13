import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { YrNoWeatherForecast } from '../types/yr-no-weather-forecast';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrentWeatherInformation(): Observable<YrNoWeatherForecast> {
    return this.http
      .get<YrNoWeatherForecast>(
        'https://api.met.no/weatherapi/locationforecast/2.0/compact?altitude=69&lat=50.8106855&lon=7.1414209'
      )
      .pipe(shareReplay());
  }
}
