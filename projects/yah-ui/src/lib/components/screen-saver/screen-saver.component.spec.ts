import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSaverComponent } from './screen-saver.component';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('ScreenSaverComponent', () => {
  let component: ScreenSaverComponent;
  let fixture: ComponentFixture<ScreenSaverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenSaverComponent ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Screensaver Functionality', () => {

    it('it should, upon clicking the screen saver return to the main screen', () => {
      const returnToMainScrenMethod = spyOn(component, 'returnToMainScreen');
      const divScreenSaver = fixture.debugElement.query(By.css('div'));

      divScreenSaver.triggerEventHandler('click', {});

      expect(returnToMainScrenMethod).toHaveBeenCalledTimes(1);

    })

  })
});
