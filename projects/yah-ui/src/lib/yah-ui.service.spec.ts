import { TestBed } from '@angular/core/testing';

import { YahUiService } from './yah-ui.service';

describe('YahUiService', () => {
  let service: YahUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YahUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
