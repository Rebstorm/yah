import {
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  take,
  tap,
} from 'rxjs/operators';
import { LightService } from './../../services/light.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'yah-light-setup',
  templateUrl: './light-setup.component.html',
  styleUrls: ['./light-setup.component.scss'],
})
export class LightSetupComponent implements OnInit {
  @ViewChild('ipInput', { static: true }) ipInput: ElementRef<HTMLInputElement>;

  checkingSubscription: Subscription;

  validIp = 'disconnected';

  constructor(private lightService: LightService) {
    this.lightService.hueBridgeIp.subscribe((res) => {
      if (res) {
        this.ipInput.nativeElement.value = res;
        this.validIp = 'connected';
      }
    });
  }

  ngOnInit(): void {}

  public checkIP() {
    const input = this.ipInput.nativeElement.value;

    if (input.length > 1) {
      this.validIp = 'loading';

      // Have we already fired it? Then let it run out..
      if (this.checkingSubscription) {
        this.checkingSubscription.unsubscribe();
      }

      this.checkingSubscription = this.lightService
        .checkHueBridgeIp(input)
        .pipe(debounceTime(750), distinctUntilChanged(), take(1))
        .subscribe(
          (res) => {
            res.status === 200
              ? this.setNewHueValidIp(input)
              : this.showErrorMessage();
          },
          (err) => this.showErrorMessage()
        );
    }
  }
  showErrorMessage() {
    this.validIp = 'disconnected';
  }
  setNewHueValidIp(input: string) {
    this.checkingSubscription.unsubscribe();
    this.validIp = 'connected';
    this.lightService.saveHueBridgeIp(input).subscribe();
  }
}
