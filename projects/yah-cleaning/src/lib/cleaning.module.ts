import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleaningButtonComponent } from './components/cleaning-button/cleaning-button.component';



@NgModule({
  declarations: [CleaningButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [CleaningButtonComponent]
})
export class CleaningModule { }
