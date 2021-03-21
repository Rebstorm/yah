import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from '../../../../services/app-settings.service';

@Component({
  selector: 'app-setupmenu',
  templateUrl: './setupmenu.component.html',
  styleUrls: ['./setupmenu.component.scss'],
})
export class SetupmenuComponent implements OnInit {

  constructor(private appSettings: AppSettingsService) {}

  public ngOnInit(): void {}

  public setBg(bg: string): void {
    this.appSettings.setBg(bg).subscribe();
  }
}
