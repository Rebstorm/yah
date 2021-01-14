import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, take, tap } from 'rxjs/operators';
import {WeatherService} from '../../services/weather.service';
import {TimeSeries} from '../../types/yr-no-weather-forecast';
import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'yah-weather-button',
  templateUrl: './weather-button.component.html',
  styleUrls: ['./weather-button.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ marginTop: 40, opacity: 0 })),
      state('*', style({ marginTop: 0, opacity: 1 })),
      transition(':enter', animate('800ms ease-out')),
      transition(':leave', animate('800ms ease-in')),
    ])
  ]
})
export class WeatherButtonComponent implements OnInit {
  spinnerName = 'weather-spinner';
  currentDegrees = -1;
  currentIcon = '';
  nextHourIcon = '';
  nextHourDegrees = -1;

  constructor(
    private spinner: NgxSpinnerService,
    private weatherService: WeatherService,
  ) {
    this.spinner.show(this.spinnerName);

    this.weatherService
      .getCurrentWeatherInformation()
      .pipe(
        take(1),
        map((res) => res.properties.timeseries[0]),
        tap(() => this.spinner.hide(this.spinnerName))
      )
      .subscribe((timeSeries) => this.setWeatherInformation(timeSeries));
  }

  private setWeatherInformation(timeSeries: TimeSeries): void {
    this.currentDegrees = timeSeries.data.instant.details.air_temperature;
    this.nextHourIcon = timeSeries.data.next_1_hours.summary.symbol_code;
    this.currentIcon = timeSeries.data.next_12_hours.summary.symbol_code;
  }

  ngOnInit(): void {}
}
