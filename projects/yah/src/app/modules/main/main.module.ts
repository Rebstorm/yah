import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StartScreenComponent} from './components/start-screen/start-screen.component';
import {WeatherModule} from 'yah-weather';
import {LightModule} from 'yah-light';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CleaningModule} from 'yah-cleaning';
import {SolarModule} from 'yah-solar';


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
    LightModule,
    DragDropModule,
    RouterModule.forChild(routes),
    CleaningModule,
    WeatherModule,
    SolarModule,
  ]
})
export class MainModule { }
