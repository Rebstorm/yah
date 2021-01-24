import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleaningButtonComponent } from './components/cleaning-button/cleaning-button.component';
import {NgxSpinnerModule} from 'ngx-spinner';



@NgModule({
  declarations: [CleaningButtonComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [CleaningButtonComponent]
})
export class CleaningModule { }
