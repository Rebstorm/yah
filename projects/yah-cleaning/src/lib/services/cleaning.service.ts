import { Injectable } from '@angular/core';
import { concat, EMPTY, Observable, of } from 'rxjs';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {delay, map, repeat, switchMap, timestamp} from 'rxjs/operators';
import { CleaningStatus } from '../types/cleaning-status';

@Injectable({
  providedIn: 'root',
})
export class CleaningService {
  public status$: Observable<CleaningStatus>;
  private SERVER_URL = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) {
    this.status$ = this.http
      .get<CleaningStatus>(`${this.SERVER_URL}/api/local/info/mission`)
      .pipe(
        timestamp(),
        switchMap(({ timestamp: ts, value: value }) =>
          concat(of(value), EMPTY.pipe(delay(60000)))
        ),
        repeat()
      );
  }

  public startRobot(): Observable<boolean> {
    return this.http.get(`${this.SERVER_URL}/api/local/action/start`, {observe: 'response'})
      .pipe(
        map(response => !!response.status
        ));
  }

  stopRobot(): Observable<boolean> {
    return this.http.get(`${this.SERVER_URL}/api/local/action/stop`, {observe: 'response'})
      .pipe(
        map(response => !!response.status
        ));
  }
}
