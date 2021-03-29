import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Counter', () => {
    it('should increment the counter if pressing the plus', () => {
      const incrementMethod = spyOn(component, 'increment');

      const plusButton = fixture.debugElement.query(By.css('.plus'));
      plusButton.triggerEventHandler('click', {});

      expect(incrementMethod).toHaveBeenCalledTimes(1);
    });

    it('should decrease the counter if pressing the minus', () => {
      const incrementMethod = spyOn(component, 'decrement');

      const minusButton = fixture.debugElement.query(By.css('.min'));
      minusButton.triggerEventHandler('click', {});

      expect(incrementMethod).toHaveBeenCalledTimes(1);
    });
  });
});
