import { Component, OnInit } from '@angular/core';
import { CleaningService } from '../../services/cleaning.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'yah-cleaning-button',
  templateUrl: './cleaning-button.component.html',
  styleUrls: ['./cleaning-button.component.scss'],
})
export class CleaningButtonComponent implements OnInit {
  robotAvailable = false;
  robotBattery = 0;
  private SPINNER_NAME = 'cleaning-connection-spinner';

  constructor(private cleaningService: CleaningService, private ngxSpinnerService: NgxSpinnerService) {
    this.ngxSpinnerService.show(this.SPINNER_NAME);
    this.cleaningService.status$.subscribe((status) => {
      this.ngxSpinnerService.hide(this.SPINNER_NAME);

      this.robotAvailable = status.bin.present;
      this.robotBattery = status.batPct;
    });
  }

  ngOnInit(): void {}
}
