import { TestBed } from '@angular/core/testing';

import { CleaningService } from './cleaning.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CleaningButtonComponent} from '../components/cleaning-button/cleaning-button.component';

describe('CleaningService', () => {
  let service: CleaningService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: 'setup', component: CleaningButtonComponent}])]
    });
    service = TestBed.inject(CleaningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
