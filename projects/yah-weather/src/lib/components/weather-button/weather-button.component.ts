import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, take, tap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import { TimeSeries } from '../../types/yr-no-weather-forecast';
import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'yah-weather-button',
  templateUrl: './weather-button.component.html',
  styleUrls: ['./weather-button.component.scss'],
})
export class WeatherButtonComponent implements OnInit, OnDestroy {
  spinnerName = 'weather-spinner';
  currentDegrees = -1;
  currentIcon = null;
  nextHourIcon = '';
  next12HoursIcon = '';
  lastTimeRefreshed = '';
  private weatherSubscription: Subscription;

  constructor(
    private spinner: NgxSpinnerService,
    private weatherService: WeatherService
  ) {
    this.spinner.show(this.spinnerName);

    this.weatherSubscription = this.weatherService
      .getCurrentWeatherInformation()
      .pipe(
        tap(() => this.spinner.show(this.spinnerName)),
        map((res) => res.properties.timeseries[0]),
        tap(() => this.spinner.hide(this.spinnerName))
      )
      .subscribe((timeSeries) => this.setWeatherInformation(timeSeries));
  }

  private setWeatherInformation(timeSeries: TimeSeries): void {
    this.currentDegrees = timeSeries.data.instant.details.air_temperature;
    this.currentIcon = timeSeries.data.next_1_hours.summary.symbol_code;

    this.nextHourIcon = timeSeries.data.next_1_hours.summary.symbol_code;
    this.next12HoursIcon = timeSeries.data.next_12_hours.summary.symbol_code;

    this.lastTimeRefreshed = new Date(timeSeries.time).toLocaleTimeString();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.weatherSubscription.unsubscribe();
  }
}
