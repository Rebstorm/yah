import { Component, OnDestroy, OnInit } from '@angular/core';
import { LightService } from '../../services/light.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'yah-light-button',
  templateUrl: './light-button.component.html',
  styleUrls: ['./light-button.component.scss'],
})
export class LightButtonComponent implements OnInit, OnDestroy {
  clickHueButton = false;

  isAuthenticatedSub: Subscription;
  registerAuthBridge: Subscription;

  constructor(
    private lightsService: LightService,
    private ngxSpinnerService: NgxSpinnerService,
    private hotToast: HotToastService
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
    this.registerAuthBridge = this.lightsService
      .registerAppToBridge()
      .subscribe((isAuthed) => {
        if (!isAuthed) {
          this.hotToast.show('Philips Hue Brauche Ihre Aufmerksamkeit!', {
            style: {
              background: 'rgba(255, 255, 255, 0.8)',
            },
            id: 'philips-hue',
            ariaLive: 'polite',
          });
          this.clickHueButton = true;
          this.ngxSpinnerService.show('light-auth-spinner');
        } else {
          this.setupLightConnection();
          this.registerAuthBridge.unsubscribe();
        }
      });
  }

  private setupLightConnection(): void {
    console.log('we authenticated?');
    this.clickHueButton = false;

    // TODO: Maybe find a way to make this function better in the subscriber.
    this.isAuthenticatedSub.unsubscribe();
  }

  turnOffAllLights(): void {
    this.lightsService.turnOffAllLights$
      .pipe(take(1))
      .subscribe((res) => console.log(res));
  }
}
