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

  constructor(private solarService: SolarService) {



  }

  ngOnInit(): void {
    this.solarService.isActivated$.subscribe((isActivated) => {
      this.isActivated = isActivated;
    });
  }

  public setChecked(event: Event): void {
    const htmlInput = event.target as HTMLInputElement;
    this.solarService.setActivated(htmlInput.checked).subscribe();
  }

  public setSiteId(event: Event): void {
    const htmlInput = event.target as HTMLInputElement;
  }

  public setApiKey(event: Event): void {
    const htmlInput = event.target as HTMLInputElement;
  }
}
