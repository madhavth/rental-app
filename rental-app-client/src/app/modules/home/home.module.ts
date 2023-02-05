import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from 'src/app/components/card/card.component';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';
import { SliderComponent } from 'src/app/components/slider/slider.component';

@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    CarouselComponent,
    SliderComponent,
  ],
  exports: [CardComponent, CarouselComponent, SliderComponent, CommonModule],

  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
})
export class HomeModule {}
