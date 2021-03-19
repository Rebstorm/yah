import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['main']).then();
  }

  // Because, auxiliary routes in lazy loaded modules are really shit.
  public routeToWeatherOption(): void {
    this.router.navigate(['setup', { outlets: { options: ['weather'] } }], {});
  }

  public routeToSolarOption(): void {
    this.router.navigate(['setup', { outlets: { options: ['solar'] } }], {});
  }

  public routeToLightOption(): void {
    this.router.navigate(['setup', { outlets: { options: ['light'] } }], {});
  }

  public routeToCleaningOption(): void {
    this.router.navigate(['setup', { outlets: { options: ['cleaning'] } }], {});
  }
}
