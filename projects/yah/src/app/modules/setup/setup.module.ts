import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { SetupComponent } from './components/setup/setup.component';
import {LightModule} from 'yah-light';
import {CleaningModule} from '../../../../../yah-cleaning/src/lib/cleaning.module';


export const routes: Routes = [
  {
    path: '',
    component: SetupComponent
  }
]

@NgModule({
  declarations: [SetupComponent],
  imports: [
    CommonModule,
    LightModule,
    CleaningModule,
    RouterModule.forChild(routes)
  ]
})
export class SetupModule { }
