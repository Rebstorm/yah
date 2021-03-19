import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupmenuComponent } from './setupmenu.component';

describe('SetupmenuComponent', () => {
  let component: SetupmenuComponent;
  let fixture: ComponentFixture<SetupmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
