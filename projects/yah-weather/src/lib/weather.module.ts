import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherButtonComponent} from './components/weather-button/weather-button.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { WeatherSetupComponent } from './components/weather-setup/weather-setup.component';


@NgModule({
  declarations: [WeatherButtonComponent, WeatherSetupComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [WeatherButtonComponent, WeatherSetupComponent]
})
export class WeatherModule { }
