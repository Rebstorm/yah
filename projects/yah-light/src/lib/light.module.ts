import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightButtonComponent } from './components/light-button/light-button.component';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [LightButtonComponent],
  imports: [CommonModule, NgxSpinnerModule],
  exports: [LightButtonComponent],
})
export class LightModule {}
