import { take, tap } from 'rxjs/operators';
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

  validIp = false;

  constructor(private lightService: LightService) {
    this.lightService.hueBridgeIp.subscribe((res) => {
      if (res) {
        this.ipInput.nativeElement.value = res;
        this.validIp = true;
      }
    });
  }

  ngOnInit(): void {}

  public checkIP() {
    const input = this.ipInput.nativeElement.value;

    if (input.length > 1) {
      this.checkingSubscription = this.lightService
        .checkHueBridgeIp(input)
        .pipe(
          take(1),
          tap(() => (this.validIp = false))
        )
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
    this.validIp = false;
  }
  setNewHueValidIp(input: string) {
    this.checkingSubscription.unsubscribe();
    this.validIp = true;
    this.lightService.saveHueBridgeIp(input).subscribe();
  }
}
