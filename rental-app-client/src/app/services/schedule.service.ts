import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Schedule } from '../model/schedule';
import { CalendarModel } from '../model/calendarDataModel';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}
  scheduleData!: CalendarModel;
  makeAnAppointment(payload: Schedule) {
    return this.http.post<{ success: boolean; data: string }>(
      `${environment.SERVER}/users/schedules`,
      payload
    );
  }

  getAppointment(selectedMonth: Date) {
    return this.http.get<{ success: boolean; data: any }>(
      `${environment.SERVER}/users/schedules/?time=${selectedMonth}`
    );
  }
}
