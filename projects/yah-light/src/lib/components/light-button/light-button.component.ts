import { Component, OnInit } from '@angular/core';
import {LightService} from '../../services/light.service';
import {take} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'yah-light-button',
  templateUrl: './light-button.component.html',
  styleUrls: ['./light-button.component.scss']
})
export class LightButtonComponent implements OnInit {
  clickHueButton = false;

  constructor(private lightsService: LightService, private ngxSpinnerService: NgxSpinnerService) {
    this.lightsService.isAuthenticated$.subscribe(res => res === false ? this.tellUserToAuthenticate() : this.setupLightConnection());
  }

  ngOnInit(): void {
  }

  private tellUserToAuthenticate(): void {
    this.clickHueButton = true;
    this.ngxSpinnerService.show('light-auth-spinner');
    console.error('user needs to authenticate to light');
  }

  private setupLightConnection() {
    console.info('Light connection can be set up');
  }
}
