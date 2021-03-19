import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'yah-analogue-watch',
  templateUrl: './analogue-watch.component.html',
  styleUrls: ['./analogue-watch.component.scss'],
  animations: [],
})
export class AnalogueWatchComponent implements OnInit, OnDestroy {
  @ViewChild('canvasElement', { static: true })
  canvasElement: ElementRef<HTMLCanvasElement>;
  interval;

  constructor() {}

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    const ctx = this.canvasElement.nativeElement.getContext('2d');
    let radius = this.canvasElement.nativeElement.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.9;
    this.interval = setInterval(() => this.drawClock(ctx, radius), 1000);
  }

  private drawClock(ctx: CanvasRenderingContext2D, radius: number): void {
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
    this.drawFace(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawTime(ctx, radius);
  }

  private drawFace(ctx: CanvasRenderingContext2D, radius: number): void {
    let grad;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fill();

    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#dedddd');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#dedddd');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#dedddd';
    ctx.fill();
  }

  private drawNumbers(ctx: CanvasRenderingContext2D, radius: number): void {
    let ang;
    let num;
    ctx.font = radius * 0.15 + 'px lato';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  private drawTime(ctx: CanvasRenderingContext2D, radius: number): void {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour =
      (hour * Math.PI) / 6 +
      (minute * Math.PI) / (6 * 60) +
      (second * Math.PI) / (360 * 60);
    this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
  }

  private drawHand(ctx, pos, length, width): void {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}
