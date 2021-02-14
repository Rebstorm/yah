import { TestBed, waitForAsync } from '@angular/core/testing';

import { CleaningService } from './cleaning.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CleaningButtonComponent } from '../components/cleaning-button/cleaning-button.component';
import {take} from 'rxjs/operators';

describe('CleaningService', () => {
  let service: CleaningService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'setup', component: CleaningButtonComponent },
        ]),
      ],
    });
    service = TestBed.inject(CleaningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Loading/Setting Data', () => {
    it(
      'should set the feature as activated',
      waitForAsync(() => {
        service.saveActivated(true).subscribe( () => {
          service.isActivated$.pipe(take(1)).subscribe(res => expect(res).toBeTrue() );
        });
      })
    );
  });
});
