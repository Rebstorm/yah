import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherButtonComponent} from './components/weather-button/weather-button.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { WeatherSetupComponent } from './components/weather-setup/weather-setup.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [WeatherButtonComponent, WeatherSetupComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  exports: [WeatherButtonComponent, WeatherSetupComponent]
})
export class WeatherModule { }
