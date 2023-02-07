import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from 'src/app/components/card/card.component';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';
import { SliderComponent } from 'src/app/components/slider/slider.component';
import { SearchComponent } from 'src/app/pages/search/search.component';
import {SpinnerComponent} from "../../components/spinner/spinner.component";

@NgModule({
  declarations: [
    SpinnerComponent,
    HomeComponent,
    CardComponent,
    CarouselComponent,
    SliderComponent,
    SearchComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      {
        path: 'search',
        component: SearchComponent,
      },
    ]),
  ],
  exports: [SpinnerComponent, CardComponent, CarouselComponent, SliderComponent],
})
export class HomeModule {}
