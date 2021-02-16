import { Component, OnInit } from '@angular/core';
import {SolarService} from '../../services/solar.service';

@Component({
  selector: 'yah-solar-setup',
  templateUrl: './solar-setup.component.html',
  styleUrls: ['./solar-setup.component.scss'],
})
export class SolarSetupComponent implements OnInit {
  isActivated = false;
  validApiKey = 'disconnected';
  validSiteId = 'disconnected';

  constructor(private solarService: SolarService) {}

  ngOnInit(): void {
    this.solarService.isActivated$.subscribe(isActivated => {
      this.isActivated = isActivated;
      console.log(isActivated);
    });
  }

  public setChecked($event: Event) {}

  public setSiteId() {}

  public setApiKey() {}
}
