import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarButtonComponent } from './solar-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { By } from '@angular/platform-browser';

describe('SolarButtonComponent', () => {
  let component: SolarButtonComponent;
  let fixture: ComponentFixture<SolarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolarButtonComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, NgxSpinnerModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Loading state', () => {
    it('should show the loading screen, if its still loading', () => {
      component.finishedLoading = false;
      fixture.detectChanges();

      const loadingIndicator = fixture.debugElement.query(
        By.css('ngx-spinner')
      );
      const powerLayout = fixture.debugElement.query(By.css('.power-layout'));

      expect(loadingIndicator).toBeDefined();
      expect(powerLayout).toBeNull();
    });

    it('should show the other component stuff if it has finished loading', () => {
      component.finishedLoading = true;
      fixture.detectChanges();

      const powerLayout = fixture.debugElement.query(By.css('.power-layout'));

      expect(powerLayout).toBeDefined();
    });
  });

  describe('Layout design', () => {
    it('should have three boxes, one for the solar panels, one for the load, and one for the grid', () => {
      component.finishedLoading = true;
      fixture.detectChanges();

      const powerItems = fixture.debugElement.queryAll(By.css('.power-item'));

      expect(powerItems.length).toBe(3);
    });
  });
});
