import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherButtonComponent} from './components/weather-button/weather-button.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {WeatherSetupComponent} from './components/weather-setup/weather-setup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [WeaXtherButtonComponent, WeatherSetupComponent],
  imports: [
    CommonModule,
    NoopAnimationsModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  exports: [WeatherButtonComponent, WeatherSetupComponent]
})
export class WeatherModule { }
