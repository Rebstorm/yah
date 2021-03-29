import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from '../../../../services/app-settings.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-setupmenu',
  templateUrl: './setupmenu.component.html',
  styleUrls: ['./setupmenu.component.scss'],
})
export class SetupmenuComponent implements OnInit {

  timeoutValue: number = 0;

  constructor(private appSettings: AppSettingsService) {}

  public ngOnInit(): void {
    this.appSettings.screenSaverTimeout$.pipe(take(1)).subscribe(timeout => this.timeoutValue = (timeout / 60000));
  }

  public setBg(bg: string): void {
    this.appSettings.setBg(bg).subscribe();
  }

  public setScreenSaverTimeout(newScreeenTimeout: number): void {
    this.appSettings.setScreensaverTimeout(newScreeenTimeout).subscribe();
  }
}
