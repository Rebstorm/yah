import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';

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
}
