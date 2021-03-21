import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  public background$: Observable<string>;

  private BG_KEY = 'YAH_BG_KEY';
  constructor(private localDb: StorageMap) {
    this.background$ = localDb
      .watch(this.BG_KEY, { type: 'string' })
      .pipe(map((bg) => (bg === undefined ? this.returnDefaultBg() : bg)));
  }

  private returnDefaultBg(): string {
    return 'classic';
  }

  public setBg(bg: string): Observable<null> {
    return this.localDb.set(this.BG_KEY, bg, { type: 'string' });
  }
}
