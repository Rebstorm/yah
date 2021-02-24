import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'yah-screen-saver',
  templateUrl: './screen-saver.component.html',
  styleUrls: ['./screen-saver.component.scss']
})
export class ScreenSaverComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public returnToMainScren(): void {
    this.router.navigate(['']).then();
  }
}
