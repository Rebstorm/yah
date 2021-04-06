import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CleaningButtonComponent} from './components/cleaning-button/cleaning-button.component';
import {CleaningSetupComponent} from './components/cleaning-setup/cleaning-setup.component';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [CleaningButtonComponent, CleaningSetupComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [CleaningButtonComponent, CleaningSetupComponent]
})
export class CleaningModule { }
