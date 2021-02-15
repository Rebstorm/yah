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
              '500ms',
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
  availableApps: string[];

  constructor(
    private router: Router,
    private lightService: LightService,
    private cleaningService: CleaningService
  ) {
    this.lightService.isActivated$.subscribe((res) =>
      res ? this.availableApps.push('light') : null
    );

    this.cleaningService.isActivated$.subscribe((res) => {
      res ? this.availableApps.push('cleaning') : null;
    });

    this.availableApps = Array.of('weather', 'solar');
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
