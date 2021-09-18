import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import {
  TimeSeries,
  YrNoWeatherForecast,
} from '../../types/yr-no-weather-forecast';
import { Observable } from 'rxjs';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'lib-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ]
})
export class WeatherDetailsComponent implements OnInit {
  forecasts$: Observable<YrNoWeatherForecast>;

  private weekdays = ['Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.', 'So.'];

  constructor(private readonly weatherService: WeatherService) {
    this.forecasts$ = weatherService.getCurrentWeatherInformation();
  }

  ngOnInit(): void {}

  public humanReadableTime(time: Date): string {
    const boxedDate = new Date(time);

    const day = this.weekdays[boxedDate.getDay()] || '';
    const minutes =
      boxedDate.getMinutes() < 10
        ? '0' + boxedDate.getMinutes().toString()
        : boxedDate.getMinutes().toString();

    return `${day} ${boxedDate.getHours()}:${minutes}`;
  }
}
