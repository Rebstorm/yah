import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningButtonComponent } from './cleaning-button.component';

describe('YahCleaningComponent', () => {
  let component: CleaningButtonComponent;
  let fixture: ComponentFixture<CleaningButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
