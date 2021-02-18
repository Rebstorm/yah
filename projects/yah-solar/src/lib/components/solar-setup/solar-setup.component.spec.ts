import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarSetupComponent } from './solar-setup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('SolarSetupComponent', () => {
  let component: SolarSetupComponent;
  let fixture: ComponentFixture<SolarSetupComponent>;

  const event = {
    AT_TARGET: 0,
    BUBBLING_PHASE: 0,
    CAPTURING_PHASE: 0,
    NONE: 0,
    bubbles: false,
    cancelBubble: false,
    cancelable: false,
    composed: false,
    composedPath(): EventTarget[] {
      return [];
    },
    currentTarget: undefined,
    defaultPrevented: false,
    eventPhase: 0,
    initEvent(
      type: string,
      bubbles: boolean | undefined,
      cancelable: boolean | undefined
    ): void {},
    isTrusted: false,
    returnValue: false,
    srcElement: undefined,
    timeStamp: 0,
    type: '',
    preventDefault(): void {},
    stopImmediatePropagation(): void {},
    stopPropagation(): void {},
    target: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolarSetupComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Functionality', () => {
    it('should make sure that, if the siteId gets set - then we should see the val', () => {
      const expectedVal = 'hello there';
      component.siteId.nativeElement.value = expectedVal;
      const fireEvent = event;
      fireEvent.target = component.siteId.nativeElement as EventTarget;
      component.setSiteId(fireEvent);

      fixture.detectChanges();
      expect(component.validSiteId).toBe('connected');
    });

    it('should make sure that, if the apiKey gets set - then we should the val', () => {
      const expectedVal = 'hello there';
      component.apiKey.nativeElement.value = expectedVal;
      const fireEvent = event;
      fireEvent.target = component.apiKey.nativeElement as EventTarget;
      component.setApiKey(fireEvent);

      fixture.detectChanges();
      expect(component.validApiKey).toBe('connected');
    });

    it('activating the feature shows the correct check', () => {
      const checkChanged = spyOn(component, 'setChecked');
      const checkBox = fixture.debugElement.query(By.css('[type="checkbox"]'));
      const fireEvent = event;
      fireEvent.target = component.activateToggle.nativeElement as EventTarget;

      checkBox.triggerEventHandler('change', fireEvent);

      expect(checkChanged).toHaveBeenCalledTimes(1);
    });
  });
});
