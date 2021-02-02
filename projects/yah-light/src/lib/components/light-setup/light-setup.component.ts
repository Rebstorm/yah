import { take } from 'rxjs/operators';
import { LightService } from './../../services/light.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'yah-light-setup',
  templateUrl: './light-setup.component.html',
  styleUrls: ['./light-setup.component.scss']
})
export class LightSetupComponent implements OnInit {

  @ViewChild('ipInput', { static: true }) ipInput: ElementRef<HTMLInputElement>;
  validIp = false;

  constructor(private lightService: LightService) { }

  ngOnInit(): void {
  }


  public checkIP() {

    const input = this.ipInput.nativeElement.value;

    if(input.length > 1){
      this.lightService.checkHueBridgeIp(input).pipe(take(1)).subscribe(res => {
         res.status === 200 ? this.setNewHueValidIp(input) : this.validIp = false;
      })
    }
   


  }
  setNewHueValidIp(input: string) {
    this.lightService.saveHueBridgeIp(input).subscribe();
  }

}
