import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherIconService {
  constructor() {}

  public getWeatherIcon(symbolCode: string): string {
    console.log(symbolCode);
    const prefix = 'wi';
    return `${prefix}-${this.mapIcon(symbolCode)}`;
  }

  private mapIcon(symbolCode: string): string {
    switch (symbolCode) {
      default:
        return 'cloudy';
        break;
    }
  }
}
