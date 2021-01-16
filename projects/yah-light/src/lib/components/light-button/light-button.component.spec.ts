import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightButtonComponent } from './light-button.component';

describe('LightButtonComponent', () => {
  let component: LightButtonComponent;
  let fixture: ComponentFixture<LightButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
