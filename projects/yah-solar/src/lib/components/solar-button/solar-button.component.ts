import { Component, OnInit } from '@angular/core';
import { SolarService } from '../../services/solar.service';

@Component({
  selector: 'yah-solar-button',
  templateUrl: './solar-button.component.html',
  styleUrls: ['./solar-button.component.scss'],
})
export class SolarButtonComponent implements OnInit {
  constructor(private solarService: SolarService) {
    this.solarService.currentPower$.subscribe((res) => console.log(res.siteCurrentPowerFlow.PV.currentPower));
  }

  ngOnInit(): void {}
}
