import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolarButtonComponent } from './components/solar-button/solar-button.component';
import { SolarSetupComponent } from './components/solar-setup/solar-setup.component';
import {NgxSpinnerModule} from 'ngx-spinner';



@NgModule({
  declarations: [SolarButtonComponent, SolarSetupComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [ SolarButtonComponent, SolarSetupComponent ]
})
export class SolarModule { }
