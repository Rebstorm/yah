import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenSaverComponent } from './components/screen-saver/screen-saver.component';
import {RouterModule} from '@angular/router';
import { AnalogueWatchComponent } from './components/analogue-watch/analogue-watch.component';



@NgModule({
  declarations: [ScreenSaverComponent, AnalogueWatchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ScreenSaverComponent }
    ])
  ],
  exports: [ ScreenSaverComponent ]
})
export class UiModule { }
