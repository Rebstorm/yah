import { TestBed } from '@angular/core/testing';

import { LightService } from './light.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('LightService', () => {
  let service: LightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule ]
    });
    service = TestBed.inject(LightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
