import { Component, ViewEncapsulation, ViewChild, Input } from '@angular/core';

import {
  ScheduleComponent,
  MonthService,
  DayService,
  WeekService,
  WorkWeekService,
  EventSettingsModel,
  ResizeService,
  DragAndDropService,
  AgendaService,
  TimelineMonthService,
} from '@syncfusion/ej2-angular-schedule';
import { Schedule } from 'src/app/model/schedule';

@Component({
  selector: 'app-schedular',
  templateUrl: 'schedular.component.html',

  styles: [
    `
      .e-location-container,
      .e-time-zone-container,
      .e-recurrenceeditor,
      .e-all-day-time-zone-row {
        display: none;
      }
    `,
  ],
  providers: [
    DayService,
    WeekService,
    MonthService,
    AgendaService,
    TimelineMonthService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SchedularComponent {
  @Input() data!: Schedule;
  @Input() callBackFn!: Function;
  public selectedDate: Date = new Date(2023, 1, 15);
  public scheduleObj!: ScheduleComponent;
  public eventSettings: EventSettingsModel = {
    dataSource: [{ ...this.data }],
  };
  onActionBegin(args: { requestType: string; data: any; cancel: boolean }) {
    let data: {
      Subject: string;
      Description: string;
      StartTime: Date;
      EndTime: Date;
    };
    let formattedPayload: Schedule;
    if (args.requestType === 'eventCreate') {
      data = args.data[0];
      formattedPayload = {
        description: data.Description,
        title: data.Subject,
        time: new Date(data.StartTime),
        time_end: new Date(data.EndTime),
      };
      this.callBackFn(formattedPayload);
    } else if (args.requestType === 'eventChange') {
      data = args.data;
      formattedPayload = {
        description: data.Description,
        title: data.Subject,
        time: new Date(data.StartTime),
        time_end: new Date(data.EndTime),
      };
      this.callBackFn(formattedPayload);
    }
  }
  public dateParser(data: string) {
    return new Date(data);
  }
}
