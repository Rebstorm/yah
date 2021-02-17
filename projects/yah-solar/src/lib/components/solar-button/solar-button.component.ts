import { Component, OnInit } from '@angular/core';
import { SolarService } from '../../services/solar.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { SolarEdgePowerFlow } from 'yah-solar';

@Component({
  selector: 'yah-solar-button',
  templateUrl: './solar-button.component.html',
  styleUrls: ['./solar-button.component.scss'],
})
export class SolarButtonComponent implements OnInit {
  pvLoad = '';
  gridLoad = '';
  load = '';

  constructor(
    private solarService: SolarService,
    private router: Router,
    private hotToast: HotToastService
  ) {
    this.solarService.currentPower$.subscribe(
      (res) => this.paintNumbers(res),
      (error) => {
        if (error.status === 403) {
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
        } else if (error.status === 429){
          this.paintTooManyRequests();
        }
      }
    );
  }

  ngOnInit(): void {}

  private paintNumbers(edgePowerFlow: SolarEdgePowerFlow): void {
    this.pvLoad = edgePowerFlow.siteCurrentPowerFlow.PV.currentPower.toString();
    this.gridLoad = edgePowerFlow.siteCurrentPowerFlow.GRID.currentPower.toString();
    this.load = edgePowerFlow.siteCurrentPowerFlow.LOAD.currentPower.toString();
  }

  private paintTooManyRequests(): void {
    console.log('Too many requests!');
  }
}
