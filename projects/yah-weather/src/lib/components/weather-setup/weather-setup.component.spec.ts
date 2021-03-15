import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSetupComponent } from './weather-setup.component';

describe('WeatherSetupComponent', () => {
  let component: WeatherSetupComponent;
  let fixture: ComponentFixture<WeatherSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
