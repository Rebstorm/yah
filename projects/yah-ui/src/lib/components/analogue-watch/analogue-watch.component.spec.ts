import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogueWatchComponent } from './analogue-watch.component';

describe('AnalogueWatchComponent', () => {
  let component: AnalogueWatchComponent;
  let fixture: ComponentFixture<AnalogueWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalogueWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalogueWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
