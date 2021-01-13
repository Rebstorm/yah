import { TestBed } from '@angular/core/testing';

import { WeatherIconService } from './weather-icon.service';

describe('WeatherIconService', () => {
  let service: WeatherIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
