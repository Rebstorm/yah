import { TestBed } from '@angular/core/testing';

import { SolarService } from './solar.service';

describe('SolarService', () => {
  let service: SolarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
