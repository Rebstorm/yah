import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarButtonComponent } from './solar-button.component';

describe('SolarButtonComponent', () => {
  let component: SolarButtonComponent;
  let fixture: ComponentFixture<SolarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
