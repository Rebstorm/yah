import {TestBed} from '@angular/core/testing';

import {WeatherService} from './weather.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
  });

  xit('should be created', () => {
    service = TestBed.inject(WeatherService);
    expect(service).toBeTruthy();
  });
});
