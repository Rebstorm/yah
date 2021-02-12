import { TestBed, waitForAsync } from '@angular/core/testing';

import { LightService } from './light.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageMap } from '@ngx-pwa/local-storage';
import { take } from 'rxjs/operators';

describe('LightService', () => {
  let service: LightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [],
    });
    service = TestBed.inject(LightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Hue Public Services', () => {
    it(
      'if the localStorage does NOT contain a valid HUE_ACTIAVTED_KEY, then return false',
      waitForAsync(() => {
        service.isActivated$.toPromise().then((res) => {
          expect(res).toBeFalse();
        });
      })
    );
  });
});
