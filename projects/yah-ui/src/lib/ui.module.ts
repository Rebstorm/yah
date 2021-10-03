import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenSaverComponent } from './components/screen-saver/screen-saver.component';
import {RouterModule} from '@angular/router';
import { AnalogueWatchComponent } from './components/analogue-watch/analogue-watch.component';
import { CounterComponent } from './components/counter/counter.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';



@NgModule({
  declarations: [ScreenSaverComponent, AnalogueWatchComponent, CounterComponent, DropdownComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ScreenSaverComponent }
    ])
  ],
  exports: [ ScreenSaverComponent, CounterComponent, DropdownComponent ]
})
export class UiModule { }
