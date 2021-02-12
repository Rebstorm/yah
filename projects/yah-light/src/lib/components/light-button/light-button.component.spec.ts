import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightButtonComponent } from './light-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastModule } from '@ngneat/hot-toast';
import { LightSetupComponent } from '../light-setup/light-setup.component';
import { LightService } from '../../services/light.service';
import { of, Subject, Subscription } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';

describe('LightButtonComponent', () => {
  let component: LightButtonComponent;
  let fixture: ComponentFixture<LightButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxSpinnerModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'setup', component: LightSetupComponent },
        ]),
        HotToastModule,
      ],
      providers: [
        {
          provide: LightService,
          useValue: {
            registerAppToBridge: () => of(true),
            isAuthenticated$: of(true),
          },
        },
      ],
      declarations: [LightButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('UI', () => {
    it('should, if the user is authenticated not show the clickHueButton', () => {
      component.clickHueButton = false;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('ngx-spinner'))).toBeNull();
      expect(component.clickHueButton).toBeFalse();
    });

    it('should show the ngx-spinner, if the clickHueButton is true', () => {
      component.clickHueButton = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('ngx-spinner'))).toBeDefined();
    });
  });

  describe('Philips hue', () => {
    it('should warn the user, if the hue bridge hasnt been registered', () => {
      component.registerAuthBridge = new Subscription();
      (component as any).tellUserToAuthenticate();

      expect(fixture.debugElement.query(By.css('ngx-spinner'))).toBeDefined();
    });

    it('should turn off all lights, if the turn off button was clicked', () => {
      const turnOfAllLights = spyOn(component, 'turnOffAllLights');

      const button = fixture.debugElement.query(By.css('.glass-button'));
      button.triggerEventHandler('click', {});

      expect(turnOfAllLights).toHaveBeenCalledTimes(1);
    });
  });
});
