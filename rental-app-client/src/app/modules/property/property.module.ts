import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddPropertyComponent } from 'src/app/pages/properties/add-property/add-property.component';
import { FavoritePropertiesComponent } from 'src/app/pages/properties/favorite-properties/favorite-properties.component';
import { MyPropertiesComponent } from 'src/app/pages/properties/my-properties/my-properties.component';
import { PropertyComponent } from 'src/app/pages/properties/property/property.component';
import { HomeModule } from '../home/home.module';
import { SliderComponent } from 'src/app/components/slider/slider.component';
@NgModule({
  declarations: [
    AddPropertyComponent,
    FavoritePropertiesComponent,
    PropertyComponent,
    MyPropertiesComponent,
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
  ],
})
export class PropertyModule {}
