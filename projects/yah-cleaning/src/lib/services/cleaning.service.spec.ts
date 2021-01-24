import { TestBed } from '@angular/core/testing';

import { CleaningService } from './cleaning.service';

describe('CleaningService', () => {
  let service: CleaningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CleaningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
