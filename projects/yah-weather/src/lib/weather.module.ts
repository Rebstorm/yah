import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherButtonComponent} from './components/weather-button/weather-button.component';
import {WeatherSetupComponent} from './components/weather-setup/weather-setup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {RouterModule} from '@angular/router';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';


@NgModule({
  declarations: [WeatherButtonComponent, WeatherSetupComponent, WeatherDetailsComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'weather', component: WeatherDetailsComponent }
    ])
  ],
  exports: [WeatherButtonComponent, WeatherSetupComponent]
})
export class WeatherModule { }
