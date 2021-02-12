import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightSetupComponent } from './light-setup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastModule } from '@ngneat/hot-toast';
import { By } from '@angular/platform-browser';
import {Subscription} from 'rxjs';

describe('LightSetupComponent', () => {
  let component: LightSetupComponent;
  let fixture: ComponentFixture<LightSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'setup', component: LightSetupComponent },
        ]),
        HotToastModule,
      ],
      declarations: [LightSetupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Checking the Inputs', () => {
    it('should, if the activated button has been clicked - send an activate event', () => {
      const checkIpMethod = spyOn(component, 'setChecked');

      const checkBoxInput = fixture.debugElement.query(
        By.css('input[type=checkbox]')
      );
      checkBoxInput.triggerEventHandler('change', {});
      expect(checkIpMethod).toHaveBeenCalledTimes(1);
    });
  });

  describe('Feedback Handlers', () => {
    it('should show disconnected, if the ip is incorrect', () => {
      component.showErrorMessage();
      expect(component.validIp).toBe('disconnected');
    });

    it('should show the correct icon (✔) if the ip is correct', () => {
      component.checkingSubscription = new Subscription();
      component.setNewHueValidIp('some-valid-string');
      expect(component.validIp).toBe('connected');
    });
  });
});
