import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightSetupComponent } from './light-setup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HotToastModule } from '@ngneat/hot-toast';

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
});
