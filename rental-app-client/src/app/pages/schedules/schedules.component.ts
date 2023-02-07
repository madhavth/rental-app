import { Component, inject } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedules',
  template: ` <app-schedular></app-schedular> `,
  styles: [],
})
export class SchedulesComponent {
  scheduleService = inject(ScheduleService);
}
