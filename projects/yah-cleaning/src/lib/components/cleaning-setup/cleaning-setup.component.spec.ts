import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningSetupComponent } from './cleaning-setup.component';

describe('CleaningSetupComponent', () => {
  let component: CleaningSetupComponent;
  let fixture: ComponentFixture<CleaningSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
