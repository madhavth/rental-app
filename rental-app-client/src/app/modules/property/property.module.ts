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
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
} from '@syncfusion/ej2-angular-schedule';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from '../../pages/properties/add-property/map.component';
import { SchedulesModule } from '../schedules/schedules.module';
import { UserAuthGuard } from 'src/app/AuthGuard/user-auth.guard';
import {SpinnerComponent} from "../../components/spinner/spinner.component";

@NgModule({
  declarations: [
    SpinnerComponent,
    MapComponent,
    AddPropertyComponent,
    FavoritePropertiesComponent,
    PropertyComponent,
    MyPropertiesComponent,
    ReviewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    RouterModule.forChild([
      {
        path: 'add',
        component: AddPropertyComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'favorites',
        component: FavoritePropertiesComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'mine',
        component: MyPropertiesComponent,
        canActivate: [UserAuthGuard],
      },
      {path: ':property_id', component: PropertyComponent},
    ]),
    HomeModule,
    LeafletModule,
    SchedulesModule,
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
