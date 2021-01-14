import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StartScreenComponent} from './components/start-screen/start-screen.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {WeatherModule} from 'yah-weather';

const routes: Routes = [
  {
    path: '',
    component: StartScreenComponent
  }
];

@NgModule({
  declarations: [StartScreenComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    WeatherModule,
    RouterModule.forChild(routes),
  ]
})
export class MainModule { }
