import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogueWatchComponent } from './analogue-watch.component';
import {By} from '@angular/platform-browser';

describe('AnalogueWatchComponent', () => {
  let component: AnalogueWatchComponent;
  let fixture: ComponentFixture<AnalogueWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalogueWatchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalogueWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('clock', () => {
    it('should start the clock on initialization', () => {
      component.ngOnInit();
      expect(component.interval).not.toBeNull();
    });

    it('should draw a clock object upon initialization', () => {
      const clock = fixture.debugElement.query(By.css('canvas'));
      expect(clock).toBeDefined();
    })
  });
});
