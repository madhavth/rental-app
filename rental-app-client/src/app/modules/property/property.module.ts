import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddPropertyComponent } from 'src/app/pages/properties/add-property/add-property.component';
import { FavoritePropertiesComponent } from 'src/app/pages/properties/favorite-properties/favorite-properties.component';
import { MyPropertiesComponent } from 'src/app/pages/properties/my-properties/my-properties.component';
import { PropertyComponent } from 'src/app/pages/properties/property/property.component';
import { HomeModule } from '../home/home.module';
import { ReviewComponent } from 'src/app/components/review/review.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
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
import { SchedularComponent } from 'src/app/common/schedular/schedular.component';
@NgModule({
  declarations: [
    AddPropertyComponent,
    FavoritePropertiesComponent,
    PropertyComponent,
    MyPropertiesComponent,
    ReviewComponent,
    SchedularComponent,
  ],
  imports: [
    ScheduleModule,
    CommonModule,
    ReactiveFormsModule,
    DateTimePickerModule,
    TimePickerAllModule,
    DateTimePickerAllModule,
    RouterModule.forChild([
      { path: 'add', component: AddPropertyComponent },
      { path: 'favorites', component: FavoritePropertiesComponent },
      { path: 'my', component: MyPropertiesComponent },
      { path: ':property_id', component: PropertyComponent },
    ]),
    HomeModule,
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
  ],
})
export class PropertyModule {}
