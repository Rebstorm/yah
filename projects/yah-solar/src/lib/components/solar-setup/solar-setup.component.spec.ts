import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarSetupComponent } from './solar-setup.component';

describe('SolarSetupComponent', () => {
  let component: SolarSetupComponent;
  let fixture: ComponentFixture<SolarSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
