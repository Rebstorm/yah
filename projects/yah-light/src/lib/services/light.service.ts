import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

export interface HueInternalModel {
  error: {
    type: number;
    address: string;
    description: string;
  };
}


@Injectable({
  providedIn: 'root',
})
export class LightService {
  constructor(private http: HttpClient) {
    this.getHueBridge().subscribe( res => console.log(res), error => console.error(error));
  }

  getHueBridge(): Observable<HueInternalModel[]> {
    // TODO: incase of adding another screen, make this more dynamic
    return this.http.post<HueInternalModel[]>('http://192.168.178.21/api/', { devicetype: 'homescreen#homescreen_app1' }, {});
  }
}

