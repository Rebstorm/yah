import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LightService } from 'yah-light';
import { CleaningService } from 'yah-cleaning';
import { SolarService } from 'yah-solar';
import { WeatherService } from 'yah-weather';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '150ms',
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class StartScreenComponent implements OnInit {
  availableApps = [];

  constructor(
    private router: Router,
    private lightService: LightService,
    private cleaningService: CleaningService,
    private solarService: SolarService,
    private weatherService: WeatherService
  ) {
    combineLatest([
      this.weatherService.activated$,
      this.lightService.isActivated$,
      this.cleaningService.isActivated$,
      this.solarService.isActivated$,
    ]).subscribe(
      ([weatherActivated, lightActivated, cleaningActivated, solarActived]) => {
        weatherActivated
          ? this.availableApps.push('weather')
          : this.availableApps.filter((value) => value === 'weather');

        lightActivated
          ? this.availableApps.push('light')
          : this.availableApps.filter((value) => value === 'light');

        cleaningActivated
          ? this.availableApps.push('cleaning')
          : this.availableApps.filter((value) => value === 'cleaning');

        solarActived
          ? this.availableApps.push('solar')
          : this.availableApps.filter((value) => value === 'solar');
      }
    );
  }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.availableApps,
      event.previousIndex,
      event.currentIndex
    );
  }

  goSettings() {
    this.router.navigate(['setup']).then();
  }
}
