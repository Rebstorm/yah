import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, take, tap } from 'rxjs/operators';
import { TimeSeries, WeatherService, WeatherIconService } from 'yah-weather';

@Component({
  selector: 'app-weather-button',
  templateUrl: './weather-button.component.html',
  styleUrls: ['./weather-button.component.scss'],
})
export class WeatherButtonComponent implements OnInit {
  spinnerName = 'weather-spinner';
  currentDegrees = -1;
  currentIcon = 'wi-cloud';

  constructor(
    private spinner: NgxSpinnerService,
    private weatherService: WeatherService,
    private weatherIconService: WeatherIconService
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
    this.currentIcon = this.weatherIconService.getWeatherIcon(
      timeSeries.data.next_12_hours.summary.symbol_code
    );

    console.log(this.currentIcon);
  }

  ngOnInit(): void {}
}
