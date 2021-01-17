import { Component, OnInit } from '@angular/core';
import {LightService} from '../../services/light.service';

@Component({
  selector: 'yah-light-button',
  templateUrl: './light-button.component.html',
  styleUrls: ['./light-button.component.scss']
})
export class LightButtonComponent implements OnInit {

  constructor(private lightsService: LightService) {

  }

  ngOnInit(): void {
  }

}
