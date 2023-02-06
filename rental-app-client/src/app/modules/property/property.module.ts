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
import { SchedularComponent } from 'src/app/common/schedular/schedular.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {MapComponent} from "../../pages/properties/add-property/map.component";
import { SchedulesModule } from '../schedules/schedules.module';
@NgModule({
  declarations: [
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
      { path: 'add', component: AddPropertyComponent },
      { path: 'favorites', component: FavoritePropertiesComponent },
      { path: 'my', component: MyPropertiesComponent },
      { path: ':property_id', component: PropertyComponent },
    ]),
    HomeModule,
    LeafletModule
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
