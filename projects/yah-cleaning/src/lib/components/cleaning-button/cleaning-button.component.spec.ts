import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningButtonComponent } from './cleaning-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('YahCleaningComponent', () => {
  let component: CleaningButtonComponent;
  let fixture: ComponentFixture<CleaningButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([{path: 'setup', component: CleaningButtonComponent}])],
      declarations: [CleaningButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should show a loading spinner, if the cleaningService has not successfully initialized the connection', () => {
      component.robotAvailable = false;
      const spinner = fixture.debugElement.query(By.css('ngx-spinner'));
      const robotStatusContainer = fixture.debugElement.query(
        By.css('.robot-status')
      );
      expect(spinner).toBeDefined();
      expect(robotStatusContainer).toBeNull();
    });

    it('should show the robot controls if the cleaning service has initialized succeesfully', () => {
      component.robotAvailable = true;
      const robotStatusContainer = fixture.debugElement.query(
        By.css('.robot-status')
      );
      expect(robotStatusContainer).toBeDefined();
    });
  });

  describe('Succesfully intialized, functionality -', () => {
    it('should, upon click start - start the robot', () => {
      const startMethod = spyOn(component, 'startRobot');
      component.robotAvailable = true;
      fixture.detectChanges();
      const robotStartCleaningButton = fixture.debugElement.query(
        By.css('.cleaning-button')
      );
      robotStartCleaningButton.triggerEventHandler('click', {});

      expect(startMethod).toHaveBeenCalledTimes(1);
    });

    it('should upon clicking stop - stop the robot', () => {
      const stopMethod = spyOn(component, 'stopRobot');
      component.robotAvailable = true;
      fixture.detectChanges();
      const stopCleaningButton = fixture.debugElement.query(
        By.css('.stop-cleaning-button')
      );
      stopCleaningButton.triggerEventHandler('click', {});

      expect(stopMethod).toHaveBeenCalledTimes(1);
    });
  });
});
