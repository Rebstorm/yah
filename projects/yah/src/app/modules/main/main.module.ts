import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { WeatherButtonComponent } from './components/weather-button/weather-button.component';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: StartScreenComponent
  }
];

@NgModule({
  declarations: [StartScreenComponent, WeatherButtonComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
  ]
})
export class MainModule { }
