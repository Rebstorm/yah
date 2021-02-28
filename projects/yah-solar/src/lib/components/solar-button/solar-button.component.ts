import { Component, OnInit } from '@angular/core';
import { SolarService } from '../../services/solar.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { SolarEdgePowerFlow } from '../../types/solar.edge.power.flow';
import { NgxSpinnerService } from 'ngx-spinner';
import { Timestamp } from 'rxjs/internal-compatibility';

@Component({
  selector: 'yah-solar-button',
  templateUrl: './solar-button.component.html',
  styleUrls: ['./solar-button.component.scss'],
})
export class SolarButtonComponent implements OnInit {
  pvLoad: number;
  gridLoad: number;
  load: number;
  loadUnit = '';
  finishedLoading = false;
  lastUpdated: string;

  solarPumpingIn: string;
  gridPumpinInOrOut: string;

  constructor(
    private solarService: SolarService,
    private router: Router,
    private hotToast: HotToastService,
    private ngxSpinner: NgxSpinnerService
  ) {
    this.ngxSpinner.show('solar-connection-spinner');
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
        } else if (error.status === 429) {
          this.paintTooManyRequests();
        }
      }
    );
  }

  ngOnInit(): void {}

  private paintNumbers(edgePowerFlow: SolarEdgePowerFlow): void {
    this.pvLoad = edgePowerFlow.siteCurrentPowerFlow.PV.currentPower;
    this.gridLoad = edgePowerFlow.siteCurrentPowerFlow.GRID.currentPower;
    this.load = edgePowerFlow.siteCurrentPowerFlow.LOAD.currentPower;
    this.loadUnit = edgePowerFlow.siteCurrentPowerFlow.unit;
    this.lastUpdated = `Aktualisiert: ${new Date().toLocaleTimeString()}`;
    this.solarPumpingIn =
      edgePowerFlow.siteCurrentPowerFlow.PV.currentPower > 0 ? '>' : '';
    this.gridPumpinInOrOut =
      edgePowerFlow.siteCurrentPowerFlow.PV.currentPower >
      edgePowerFlow.siteCurrentPowerFlow.LOAD.currentPower
        ? '>'
        : '<';

    this.ngxSpinner.hide('solar-connection-spinner');
    this.finishedLoading = true;
  }

  private paintTooManyRequests(): void {
    console.log('Too many requests!');
  }
}
