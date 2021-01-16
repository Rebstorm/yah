import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightButtonComponent } from './components/light-button/light-button.component';

@NgModule({
  declarations: [LightButtonComponent],
  imports: [CommonModule],
  exports: [LightButtonComponent],
})
export class LightModule {}
