import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesComponent } from 'src/app/pages/schedules/schedules.component';
import { RouterModule } from '@angular/router';
import {
  DateTimePickerModule,
  TimePickerAllModule,
  DateTimePickerAllModule,
} from '@syncfusion/ej2-angular-calendars';
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
} from '@syncfusion/ej2-angular-schedule';

import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

import { SchedularComponent } from 'src/app/common/schedular/schedular.component';

@NgModule({
  declarations: [SchedulesComponent, SchedularComponent],
  imports: [
    ScheduleModule,
    CommonModule,
    DateTimePickerModule,
    TimePickerAllModule,
    DateTimePickerAllModule,
    RouterModule.forChild([{ path: '', component: SchedulesComponent }]),
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
  ],

  exports: [
    ScheduleModule,
    DateTimePickerModule,
    TimePickerAllModule,
    DateTimePickerAllModule,
    SchedularComponent,
  ],
})
export class SchedulesModule {}
