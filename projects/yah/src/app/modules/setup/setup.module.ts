import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { SetupComponent } from './components/setup/setup.component';


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
    RouterModule.forChild(routes)
  ]
})
export class SetupModule { }
