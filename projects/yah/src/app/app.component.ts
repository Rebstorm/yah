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

  constructor(private router: Router, private appSettings: AppSettingsService) {
    this.timer = setTimeout(() => {
      this.router.navigate(['blank']).then();
    }, 60000);

    this.appSettings.background$.subscribe((bg) => this.changeBg(bg));
  }

  public changeBg(cssBg: string): void {
    document.body.className = cssBg;
  }

  @HostListener('document:click')
  public delayScreenSaver(): void {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.router.navigate(['blank']).then();
    }, 60000); // TODO; dont hardcode 1 min, make it settable but user.
  }
}
