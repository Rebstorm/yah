import { inject, TestBed, waitForAsync } from '@angular/core/testing';

import { AppSettingsService } from './app-settings.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import {take} from 'rxjs/operators';

describe('AppSettingsService', () => {
  let service: AppSettingsService;
  let localDB: StorageMap;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppSettingsService);
    localDB = TestBed.inject(StorageMap);
  });

  afterEach(
    waitForAsync(() => {
      localDB.delete((service as any).BG_KEY).subscribe();
    })
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Changing Background', () => {
    it(
      'should have a default background, of classic',
      waitForAsync(async () => {
        service.background$.subscribe((bg) => expect(bg).toBe('classic'));
      })
    );

    it(
      'should allow us to set a new value of the bg',
      waitForAsync(async () => {
        const expectedValue = ['classic', 'butts'];
        let i = 0;
        service.background$.pipe(take(2)).subscribe((bgValue) => {
          expect(bgValue).toBe(expectedValue[i]);
          i++;
        });
        service.setBg('butts').subscribe();
      })
    );
  });
});
