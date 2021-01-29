import { Component, OnInit } from '@angular/core';
import { CleaningService } from '../../services/cleaning.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';

@Component({
  selector: 'yah-cleaning-button',
  templateUrl: './cleaning-button.component.html',
  styleUrls: ['./cleaning-button.component.scss'],
})
export class CleaningButtonComponent implements OnInit {
  robotAvailable = false;
  robotBattery = 0;
  private SPINNER_NAME = 'cleaning-connection-spinner';
  robotStatus = '';

  constructor(
    private cleaningService: CleaningService,
    private ngxSpinnerService: NgxSpinnerService
  ) {
    this.ngxSpinnerService.show(this.SPINNER_NAME);
    this.cleaningService.status$.subscribe((status) => {
      this.ngxSpinnerService.hide(this.SPINNER_NAME);
      this.robotStatus = 'Robot verfügbar';
      this.robotAvailable = !!status.cleanMissionStatus.phase;
      this.robotBattery = status.batPct;
    });
  }

  ngOnInit(): void {}

  startRobot(): void {
    this.cleaningService
      .startRobot()
      .pipe(take(1))
      .subscribe((succesful) => {
        if (succesful === true) {
          this.robotStatus = 'Unterwegs Putzen';
        }
      });
  }

  stopRobot(): void {
    this.cleaningService.stopRobot().pipe(take(1)).subscribe((succesful) => {
      if (succesful === true) {
        this.robotStatus = 'Robot verfügbar';
      }
    });
  }
}
