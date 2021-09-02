import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import {TimeSeries} from '../../types/yr-no-weather-forecast';


@Component({
  selector: 'lib-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {

  forecasts: TimeSeries[];

  constructor(private readonly weatherService: WeatherService) {

    weatherService.getCurrentWeatherInformation().subscribe(weather =>  {
      this.forecasts = weather.properties.timeseries;
    });

  }

  ngOnInit(): void {
  }

}
