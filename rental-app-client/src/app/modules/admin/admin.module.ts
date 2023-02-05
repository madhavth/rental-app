import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminComponent} from "../../pages/admin/admin.component";
import {AdminCardComponent} from "../../components/card/admin_card.component";
import {CarouselComponent} from "../../components/carousel/carousel.component";
import {AdminCarouselComponent} from "../../components/carousel/admin_carousel.component";


@NgModule({
  declarations: [AdminCardComponent, AdminCarouselComponent],
  exports: [
    AdminCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminComponent}
    ]),
  ]
})
export class AdminModule {

}
