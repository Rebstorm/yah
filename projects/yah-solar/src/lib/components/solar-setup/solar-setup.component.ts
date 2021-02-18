import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SolarService } from '../../services/solar.service';

@Component({
  selector: 'yah-solar-setup',
  templateUrl: './solar-setup.component.html',
  styleUrls: ['./solar-setup.component.scss'],
})
export class SolarSetupComponent implements OnInit {
  isActivated = false;
  validApiKey = 'disconnected';
  validSiteId = 'disconnected';

  @ViewChild('activateToggle', { static: true })
  activateToggle: ElementRef<HTMLInputElement>;

  @ViewChild('siteId', { static: true }) siteId: ElementRef<HTMLInputElement>;
  @ViewChild('apiKey', { static: true }) apiKey: ElementRef<HTMLInputElement>;

  constructor(private solarService: SolarService) {}

  ngOnInit(): void {
    this.solarService.isActivated$.subscribe((isActivated) => {
      this.isActivated = isActivated;
    });

    this.solarService.apiKey.subscribe((apiKey) => {
      if (apiKey) {
        this.apiKey.nativeElement.value = apiKey;
        this.validApiKey = 'connected';
      }
    });

    this.solarService.siteId.subscribe((siteId) => {
      if (siteId) {
        this.siteId.nativeElement.value = siteId;
        this.validSiteId = 'connected';
      }
    });
  }

  public setChecked(event: Event): void {
    const htmlInput = event.target as HTMLInputElement;
    this.solarService.setActivated(htmlInput.checked).subscribe();
  }

  public setSiteId(event: Event): void {
    const htmlInput = event.target as HTMLInputElement;

    if (htmlInput.value.length > 0) {
      this.validSiteId = 'connected';
      this.solarService.setSiteId(htmlInput.value).subscribe();
    }
  }

  public setApiKey(event: Event): void {
    const htmlInput = event.target as HTMLInputElement;

    if (htmlInput.value.length > 0) {
      this.validApiKey = 'connected';
      this.solarService.setApiKey(htmlInput.value).subscribe();
    }
  }
}
