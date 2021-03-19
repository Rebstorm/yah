import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeatherSetupComponent } from './weather-setup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from 'yah-weather';
import { By } from '@angular/platform-browser';
import { StorageMap } from '@ngx-pwa/local-storage';

describe('WeatherSetupComponent', () => {
  let component: WeatherSetupComponent;
  let fixture: ComponentFixture<WeatherSetupComponent>;

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

  afterAll(
    waitForAsync(() => {
      const storageMap = TestBed.inject(StorageMap);
      storageMap.delete('WEATHER_ACTIVATED').subscribe();
      storageMap.delete('WEATHER_LONGITUDE').subscribe();
      storageMap.delete('WEATHER_LATITUDE').subscribe();
    })
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherSetupComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Weather Settings', () => {
    it(
      'should activate the feature, if some one toggles it on',
      waitForAsync(() => {
        const weatherService = TestBed.inject(WeatherService);

        weatherService.activated$.subscribe((activated) => {
          expect(activated).toBeDefined();
        });

        const e = event;
        const checkBox = (fixture.debugElement.query(
          By.css('[type="checkbox"]')
        ) as unknown) as HTMLInputElement;
        checkBox.checked = true;

        e.target = checkBox;
        component.setActivated(e);
      })
    );

    it(
      'should allow me to set a longitude',
      waitForAsync(() => {
        const weatherService = TestBed.inject(WeatherService);
        // We are setting the longitude, but not ever with a value, therefor, always undefined.
        const expectedResult = [undefined, undefined, ''];
        let i = 0;
        weatherService.longitude$.subscribe((activated) => {
          expect(activated).toBe(expectedResult[i]);
          i++;
        });

        component.setLongitude();
      })
    );

    it(
      'should allow me to set the latitude',
      waitForAsync(() => {
        const weatherService = TestBed.inject(WeatherService);
        // We are setting the longitude, but not ever with a value, therefor, always undefined.

        const expectedResult = [undefined, undefined, ''];
        let i = 0;
        weatherService.latitude$.subscribe((activated) => {
          expect(activated).toBe(expectedResult[i]);
          i++;
        });
        component.setLatitude();
      })
    );
  });
});
