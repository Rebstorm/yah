import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightButtonComponent } from './components/light-button/light-button.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { LightSetupComponent } from './components/light-setup/light-setup.component';

@NgModule({
  declarations: [LightButtonComponent, LightSetupComponent],
  imports: [CommonModule, NgxSpinnerModule],
  exports: [LightButtonComponent, LightSetupComponent],
})
export class LightModule {}
