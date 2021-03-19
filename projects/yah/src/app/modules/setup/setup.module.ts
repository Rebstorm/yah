import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SetupComponent } from './components/setup/setup.component';
import {LightModule, LightSetupComponent} from 'yah-light';
import {SolarModule, SolarSetupComponent} from 'yah-solar';
import {CleaningModule, CleaningSetupComponent} from 'yah-cleaning';
import {WeatherModule, WeatherSetupComponent} from 'yah-weather';
import { SetupmenuComponent } from './components/setupmenu/setupmenu.component';

export const routes: Routes = [
  {
    path: 'setup',
    component: SetupComponent,
    children: [
      {
        path: '',
        component: SetupmenuComponent,
        outlet: 'options'
      },
      {
        path: 'weather',
        outlet: 'options',
        component: WeatherSetupComponent,
      },
      {
        path: 'solar',
        outlet: 'options',
        component: SolarSetupComponent,
      },
      {
        path: 'light',
        outlet: 'options',
        component: LightSetupComponent,
      },
      {
        path: 'cleaning',
        outlet: 'options',
        component: CleaningSetupComponent,
      },
    ],
  },

];

@NgModule({
  declarations: [SetupComponent, SetupmenuComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    LightModule,
    CleaningModule,
    SolarModule,
    WeatherModule,
  ],
})
export class SetupModule {
  constructor() {}

}
