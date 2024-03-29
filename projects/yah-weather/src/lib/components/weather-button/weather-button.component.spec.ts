import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WeatherButtonComponent} from './weather-button.component';
import {By} from '@angular/platform-browser';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

xdescribe('WeatherButtonComponent', () => {
  let component: WeatherButtonComponent;
  let fixture: ComponentFixture<WeatherButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherButtonComponent],
      imports: [NgxSpinnerModule, NoopAnimationsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Information', () => {
    it('should, contain weather information - if the sub is finished', () => {
      const expectedNumber = -99999;
      component.loaded = true;
      component.currentDegrees = expectedNumber;

      fixture.detectChanges();

      const introductionHeader = fixture.debugElement.query(
        By.css('.next-hour')
      );
      expect(introductionHeader.nativeElement.innerText).toContain(
        expectedNumber
      );
    });
  });
});
