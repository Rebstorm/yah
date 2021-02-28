import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'yah-screen-saver',
  templateUrl: './screen-saver.component.html',
  styleUrls: ['./screen-saver.component.scss'],
})
export class ScreenSaverComponent implements OnInit {
  time: string;

  constructor(private router: Router) {
    setInterval(() => {
      this.time = new Date().toLocaleTimeString('DE');
    }, 1000);
  }

  ngOnInit(): void {}

  public returnToMainScreen(): void {
    this.router.navigate(['']).then();
  }
}
