import { TestBed, waitForAsync } from '@angular/core/testing';

import { SolarService } from './solar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NEVER } from 'rxjs';
import {take} from 'rxjs/operators';

describe('SolarService', () => {
  let service: SolarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(SolarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initial values', () => {
    it(
      'upon construction should know if activated',
      waitForAsync(() => {
        service.isActivated$.subscribe((res) => {
          expect(res).toBeFalse();
        });
      })
    );
  });
});
