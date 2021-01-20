import {Component, OnDestroy, OnInit} from '@angular/core';
import {LightService} from '../../services/light.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'yah-light-button',
  templateUrl: './light-button.component.html',
  styleUrls: ['./light-button.component.scss'],
})
export class LightButtonComponent implements OnInit, OnDestroy {
  clickHueButton = false;

  isAuthenticatedSub: Subscription;

  constructor(
    private lightsService: LightService,
    private ngxSpinnerService: NgxSpinnerService
  ) {
    this.isAuthenticatedSub = this.lightsService.isAuthenticated$.subscribe(
      (authenticated) =>
        authenticated === false
          ? this.tellUserToAuthenticate()
          : this.setupLightConnection()
    );
  }

  ngOnDestroy(): void {
    this.isAuthenticatedSub.unsubscribe();
  }

  ngOnInit(): void {}

  private tellUserToAuthenticate(): void {
    this.clickHueButton = true;
    this.ngxSpinnerService.show('light-auth-spinner');
  }

  private setupLightConnection(): void {
    this.clickHueButton = false;
  }

  turnOffAllLights(): void {
    this.lightsService.turnOffAllLights$.pipe(take(1)).subscribe(res => console.log(res));
  }
}
