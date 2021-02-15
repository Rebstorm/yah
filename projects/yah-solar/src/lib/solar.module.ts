import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolarButtonComponent } from './components/solar-button/solar-button.component';



@NgModule({
  declarations: [SolarButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [ SolarButtonComponent ]
})
export class SolarModule { }
