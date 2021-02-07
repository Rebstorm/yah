import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CleaningService } from '../../services/cleaning.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'yah-cleaning-setup',
  templateUrl: './cleaning-setup.component.html',
  styleUrls: ['./cleaning-setup.component.scss'],
})
export class CleaningSetupComponent implements OnInit {
  @ViewChild('ipInput', { static: true }) ipInput: ElementRef<HTMLInputElement>;

  isActivated = false;
  validIp = 'disconnected';
  checkingSubscription: Subscription;

  constructor(
    private cleaningService: CleaningService,
    private toastMessage: HotToastService
  ) {
    this.cleaningService.isActivated$.subscribe((res) => {
      this.isActivated = res;
    });

    this.cleaningService.serverUrl$.subscribe((res) => {
      this.ipInput.nativeElement.value = res ? res : '';
      this.validIp = res ? 'connected' : 'disconnected';
    });
  }

  ngOnInit(): void {}

  setChecked($event: Event): void {
    const input = $event.target as HTMLInputElement;
    this.cleaningService.saveActivated(input.checked).subscribe(() => {
      this.toastMessage.success(
        'iRobot Server Einstellungen sind gespeichert',
        {
          style: {
            background: 'rgba(255, 255, 255, 0.8)',
          },
          dismissible: true,
          ariaLive: 'polite',
          id: 'hue-saved',
        }
      );
    });
  }

  checkIP(): void {
    const input = this.ipInput.nativeElement.value;

    if (input.length > 1) {
      this.validIp = 'loading';

      // Have we already fired it? Then let it run out..
      if (this.checkingSubscription) {
        this.checkingSubscription.unsubscribe();
      }
      this.checkingSubscription = this.cleaningService
        .checkiRobotServer(input)
        .pipe(debounceTime(750), distinctUntilChanged(), take(1))
        .subscribe(
          (res) => {
            res.status === 200
              ? this.setiRobotValidIp(input)
              : this.showErrorMessage();
          },
          (err) => this.showErrorMessage()
        );
    }
  }

  showErrorMessage(): void {
    this.validIp = 'disconnected';
  }

  setiRobotValidIp(input: string): void {
    this.checkingSubscription.unsubscribe();
    this.validIp = 'connected';
    this.cleaningService.saveiRobotIp(input).subscribe(() => {
      this.ipInput.nativeElement.value = input;
      this.toastMessage.success(
        'iRobot Server Einstellungen sind gespeichert',
        {
          style: {
            background: 'rgba(255, 255, 255, 0.8)',
          },
          dismissible: true,
          ariaLive: 'polite',
          id: 'hue-saved',
        }
      );
    });
  }
}
