import {
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  take,
  tap,
} from 'rxjs/operators';
import { LightService } from './../../services/light.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'yah-light-setup',
  templateUrl: './light-setup.component.html',
  styleUrls: ['./light-setup.component.scss'],
})
export class LightSetupComponent implements OnInit {
  @ViewChild('ipInput', { static: true }) ipInput: ElementRef<HTMLInputElement>;

  checkingSubscription: Subscription;

  validIp = 'disconnected';
  isActivated = false;

  constructor(private lightService: LightService) {
    this.lightService.hueBridgeIp$.subscribe((res) => {
      if (res) {
        this.ipInput.nativeElement.value = res;
        this.validIp = 'connected';
      }
    });

    this.lightService.isActivated$.subscribe((res) => {
      this.isActivated = res;
    });
  }

  ngOnInit(): void {}

  public checkIP(): void {
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
  showErrorMessage(): void {
    this.validIp = 'disconnected';
  }
  setNewHueValidIp(input: string): void {
    this.checkingSubscription.unsubscribe();
    this.validIp = 'connected';
    this.lightService.saveHueBridgeIp(input).subscribe();
  }

  setChecked($event: Event): void {
    const input = $event.target as HTMLInputElement;
    this.lightService.saveActivated(input.checked).subscribe();
  }
}
