import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningSetupComponent } from './cleaning-setup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('CleaningSetupComponent', () => {
  let component: CleaningSetupComponent;
  let fixture: ComponentFixture<CleaningSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CleaningSetupComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Functionality', () => {
    it('should, upon toggling on the activation - handle a toggle on event', () => {
      const checkedOnMethod = spyOn(component, 'setChecked');

      const checkBoxInput = fixture.debugElement.query(
        By.css('input[type=checkbox]')
      );
      checkBoxInput.triggerEventHandler('change', {});
      expect(checkedOnMethod).toHaveBeenCalledTimes(1);
    });
  });
});
