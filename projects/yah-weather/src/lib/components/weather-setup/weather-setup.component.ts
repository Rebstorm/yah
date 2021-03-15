import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'yah-weather-setup',
  templateUrl: './weather-setup.component.html',
  styleUrls: ['./weather-setup.component.scss'],
})
export class WeatherSetupComponent implements OnInit {
  weatherForm: FormGroup;
  activated = new FormControl(false);
  longitude = new FormControl('');
  latitude = new FormControl('');

  private activatedSubscriptions: Subscription;

  constructor(private weatherService: WeatherService) {
    this.weatherForm = new FormGroup({
      activated: this.activated,
      longitude: this.longitude,
      latitude: this.latitude,
    });

    this.activatedSubscriptions = this.weatherService.activated$.subscribe(
      (isActivated) => {
        this.weatherForm.get('activated').setValue(isActivated);
      }
    );

    this.weatherService.longitude$.subscribe((longitude) => {
      this.weatherForm.get('longitude').setValue(longitude);
    });

    this.weatherService.latitude$.subscribe((latitude) => {
      this.weatherForm.get('latitude').setValue(latitude);
    });
  }

  ngOnInit(): void {}

  public setActivated($event: Event): void {
    const checked = $event.target as HTMLInputElement;
    this.weatherService.setActivated(checked.checked).subscribe();
  }

  public setLongitude(): void {
    const long = this.weatherForm.get('longitude').value;
    this.weatherService.setLongitude(long).subscribe();
  }

  public setLatitude(): void {
    const lat = this.weatherForm.get('latitude').value;
    this.weatherService.setLatitude(lat).subscribe();
  }
}
