import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StartScreenComponent} from './components/start-screen/start-screen.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {WeatherModule} from 'yah-weather';
import { LightModule } from 'yah-light';
import {DragDropModule} from '@angular/cdk/drag-drop';

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
    LightModule,
    DragDropModule,
    RouterModule.forChild(routes),
  ]
})
export class MainModule { }
