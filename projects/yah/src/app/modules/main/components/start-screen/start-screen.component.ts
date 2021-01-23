import {Component, OnInit} from '@angular/core';
import {animate, query, stagger, style, transition, trigger,} from '@angular/animations';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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

  constructor() {
    this.availableApps = Array.of('weather', 'light', 'cleaning');
  }

  ngOnInit(): void {
  }


  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.availableApps, event.previousIndex, event.currentIndex);
  }
}
