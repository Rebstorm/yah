import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YahUiComponent } from './yah-ui.component';

describe('YahUiComponent', () => {
  let component: YahUiComponent;
  let fixture: ComponentFixture<YahUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YahUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YahUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
