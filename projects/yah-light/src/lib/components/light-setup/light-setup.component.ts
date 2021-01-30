import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yah-light-setup',
  templateUrl: './light-setup.component.html',
  styleUrls: ['./light-setup.component.scss']
})
export class LightSetupComponent implements OnInit {

  validIp = false;

  constructor() { }

  ngOnInit(): void {
  }

}
