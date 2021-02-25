import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'yah';

  timer: ReturnType<typeof setTimeout>;

  constructor(private router: Router) {
  }

  @HostListener('document:click')
  public delayScreenSaver(): void {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.router.navigate(['screen']).then();
    }, 300000); // TODO; dont hardcode 5 min, make it settable but user.
  }
}
