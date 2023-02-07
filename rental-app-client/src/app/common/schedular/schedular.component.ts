import { Component, ViewEncapsulation, Input, inject } from '@angular/core';

import {
  ScheduleComponent,
  MonthService,
  DayService,
  WeekService,
  EventSettingsModel,
  AgendaService,
  TimelineMonthService,
} from '@syncfusion/ej2-angular-schedule';
import { CalendarModel } from 'src/app/model/calendarDataModel';
import { Schedule } from 'src/app/model/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';

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
  data!: CalendarModel[];
  @Input() callBackFn!: Function;
  scheduleService = inject(ScheduleService);
  public selectedDate: Date = new Date(2023, 1, 15);
  public scheduleObj!: ScheduleComponent;
  public eventSettings!: EventSettingsModel;

  constructor() {
    this.fetchSchedules(new Date());
  }
  fetchSchedules(currentViewDate: Date) {
    this.scheduleService.getAppointment(currentViewDate).subscribe((res) => {
      const buyer: CalendarModel[] = res.data.buyer.map((prop: Schedule) => {
        return {
          ...this.scheduleService.scheduleData,
          Subject: '(Buyer) ' + prop.title,
          Id: prop.schedule_id,
          StartTime: prop.time,
          EndTime: prop.time_end,
          Description: prop.description,
        };
      });

      const seller: CalendarModel[] = res.data.owner.map((prop: Schedule) => {
        return {
          ...this.scheduleService.scheduleData,
          Subject: '(Seller) ' + prop.title,
          Id: prop.schedule_id,
          StartTime: prop.time,
          EndTime: prop.time_end,
          Description: prop.description,
        };
      });
      this.data = [...buyer, ...seller];
      this.eventSettings = {
        dataSource: this.data,
      };
    });
  }
  onNavigation(args: {
    action: string;
    previousDate: Date;
    currentDate: Date;
  }) {
    if (
      args.action === 'date' &&
      args.previousDate.getMonth() != args.currentDate.getMonth()
    ) {
      this.fetchSchedules(args.currentDate);
    }
  }

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
