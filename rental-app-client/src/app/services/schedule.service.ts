import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  makeAnAppointment(payload: Schedule) {
    return this.http.post<{ success: boolean; data: string }>(
      `${environment.SERVER}/users/schedules`,
      payload
    );
  }
}
