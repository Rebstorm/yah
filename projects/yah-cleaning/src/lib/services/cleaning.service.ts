import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, repeat } from 'rxjs/operators';
import {CleaningStatus} from '../types/cleaning-status';



@Injectable({
  providedIn: 'root',
})
export class CleaningService {
  status$: Observable<CleaningStatus>;

  private SERVER_URL = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) {
    this.status$ = this.http
      .get<CleaningStatus>(`${this.SERVER_URL}/api/local/info/mission`)
      .pipe(delay(10000), repeat());
  }
}
