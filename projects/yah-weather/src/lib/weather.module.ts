import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherButtonComponent} from './components/weather-button/weather-button.component';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [WeatherButtonComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [WeatherButtonComponent]
})
export class WeatherModule { }
