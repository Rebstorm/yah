import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenSaverComponent } from './components/screen-saver/screen-saver.component';
import {RouterModule} from '@angular/router';
import { AnalogueWatchComponent } from './components/analogue-watch/analogue-watch.component';
import { CounterComponent } from './components/counter/counter.component';



@NgModule({
  declarations: [ScreenSaverComponent, AnalogueWatchComponent, CounterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ScreenSaverComponent }
    ])
  ],
  exports: [ ScreenSaverComponent, CounterComponent ]
})
export class UiModule { }
