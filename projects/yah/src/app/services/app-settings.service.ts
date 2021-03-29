import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  public background$: Observable<string>;
  public screenSaverTimeout$: Observable<number>;

  private BG_KEY = 'YAH_BG_KEY';
  private SCREENSAVER_KEY = 'YAH_SCREENSAVER_KEY';
  constructor(private localDb: StorageMap) {
    this.background$ = localDb
      .watch(this.BG_KEY, { type: 'string' })
      .pipe(map((bg) => (bg === undefined ? this.returnDefaultBg() : bg)));

    this.screenSaverTimeout$ = localDb
      .watch(this.SCREENSAVER_KEY, { type: 'number' })
      .pipe(
        map((timeout) =>
          timeout === undefined || timeout === 0
            ? this.returnDefaultScreensaverTimeout()
            : (timeout * 60000)
        )
      );
  }

  private returnDefaultBg(): string {
    return 'classic';
  }

  public setBg(bg: string): Observable<null> {
    return this.localDb.set(this.BG_KEY, bg, { type: 'string' });
  }

  public setScreensaverTimeout(newScreeenTimeout: number): Observable<null> {
    return this.localDb.set(this.SCREENSAVER_KEY, newScreeenTimeout, {
      type: 'number',
    });
  }

  private returnDefaultScreensaverTimeout(): number {
    return 60000;
  }
}
