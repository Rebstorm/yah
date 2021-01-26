import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightSetupComponent } from './light-setup.component';

describe('LightSetupComponent', () => {
  let component: LightSetupComponent;
  let fixture: ComponentFixture<LightSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
