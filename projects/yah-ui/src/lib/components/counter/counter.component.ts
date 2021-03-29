import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'yah-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  constructor() {}

  // tslint:disable-next-line:variable-name
  public _value = 0;
  @Output() value: EventEmitter<number> = new EventEmitter();

  // tslint:disable-next-line:variable-name
  private _canBeNegative = true;
  @Input() set canBeNegative(canBeNegative: boolean) {
    this._canBeNegative = canBeNegative;
  }

  // tslint:disable-next-line:variable-name
  public _unit: string;
  @Input() set unit(unit: string) {
    this._unit = unit;
  }

  @Input() set setValue(value: number) {
    this._value = value;
  }

  ngOnInit(): void {}

  public decrement(): void {
    if (this._value < 1 && !this._canBeNegative) {
      return;
    }

    this._value--;
    this.value.next(this._value);
  }

  public increment(): void {
    this._value++;
    this.value.next(this._value);
  }
}
