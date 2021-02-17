import { Component, OnInit } from '@angular/core';
import { SolarService } from '../../services/solar.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'yah-solar-button',
  templateUrl: './solar-button.component.html',
  styleUrls: ['./solar-button.component.scss'],
})
export class SolarButtonComponent implements OnInit {
  constructor(
    private solarService: SolarService,
    private router: Router,
    private hotToast: HotToastService
  ) {
    this.solarService.currentPower$.subscribe(
      (res) => console.log(res.siteCurrentPowerFlow.PV.currentPower),
      (error) => {
        this.hotToast.error(
          `SolarEdge Brauche Ihr aufmerksamkeit: ${error.error.String}`,
          {
            style: {
              background: 'rgba(255, 255, 255, 0.8)',
            },
            id: 'solar-edge',
            ariaLive: 'polite',
          }
        );
        router.navigate(['setup']).then();
      }
    );
  }

  ngOnInit(): void {}
}
