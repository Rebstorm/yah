import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LightButtonComponent} from './components/light-button/light-button.component';
import {LightSetupComponent} from './components/light-setup/light-setup.component';
import {HotToastModule} from '@ngneat/hot-toast';

@NgModule({
  declarations: [LightButtonComponent, LightSetupComponent],
  imports: [CommonModule, HotToastModule],
  exports: [LightButtonComponent, LightSetupComponent],
})
export class LightModule {}
