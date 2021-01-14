import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherButtonComponent } from './weather-button.component';

describe('WeatherButtonComponent', () => {
  let component: WeatherButtonComponent;
  let fixture: ComponentFixture<WeatherButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
