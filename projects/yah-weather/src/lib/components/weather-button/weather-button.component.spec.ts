import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherButtonComponent } from './weather-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';

describe('WeatherButtonComponent', () => {
  let component: WeatherButtonComponent;
  let fixture: ComponentFixture<WeatherButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherButtonComponent],
      imports: [HttpClientTestingModule, NgxSpinnerModule],
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
