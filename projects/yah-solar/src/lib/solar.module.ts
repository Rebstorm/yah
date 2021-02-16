import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolarButtonComponent } from './components/solar-button/solar-button.component';
import { SolarSetupComponent } from './components/solar-setup/solar-setup.component';



@NgModule({
  declarations: [SolarButtonComponent, SolarSetupComponent],
  imports: [
    CommonModule
  ],
  exports: [ SolarButtonComponent, SolarSetupComponent ]
})
export class SolarModule { }
