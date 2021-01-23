import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yah-cleaning-button',
  templateUrl: './cleaning-button.component.html',
  styleUrls: ['./cleaning-button.component.scss'],
})
export class CleaningButtonComponent implements OnInit {
  ROBOT_DETAILS = {
    ver: '3',
    hostname: 'Roomba-3174420892025740',
    robotname: 'Staubie',
    ip: '192.168.178.49',
    mac: 'D0:C5:D3:38:F6:57',
    sw: '3.4.62',
    sku: 'e515440',
    nc: 0,
    proto: 'mqtt',
    cap: { ota: 1, eco: 1, svcConf: 1 },
    blid: '3174420892025740',
    pw: ':1:1554031907:sfmsHscY8ACd2QbD',
  };

  constructor() {}

  ngOnInit(): void {}
}
