import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingsService } from './services/app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'yah';
  timer: ReturnType<typeof setTimeout>;

  delayScreensaverTimeout;

  constructor(private router: Router, private appSettings: AppSettingsService) {
    this.appSettings.background$.subscribe((bg) => this.changeBg(bg));
    this.appSettings.screenSaverTimeout$.subscribe((timeout) => {
      this.delayScreensaverTimeout = timeout;
      this.timer = setTimeout(() => {
        this.router.navigate(['blank']).then();
      }, timeout);
    });
  }

  public changeBg(cssBg: string): void {
    document.body.className = cssBg;
  }

  @HostListener('document:click')
  public delayScreenSaver(): void {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.router.navigate(['blank']).then();
    }, this.delayScreensaverTimeout); // TODO; dont hardcode 1 min, make it settable but user.
  }
}
