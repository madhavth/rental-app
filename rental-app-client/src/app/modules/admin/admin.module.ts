import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from '../../pages/admin/admin.component';
import { AdminCardComponent } from '../../components/card/admin_card.component';
import { AdminCarouselComponent } from '../../components/carousel/admin_carousel.component';
import { AdminGuard } from 'src/app/AuthGuard/admin.guard';

@NgModule({
  declarations: [AdminCardComponent, AdminCarouselComponent, AdminComponent],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AdminComponent, canActivate: [AdminGuard] },
    ]),
  ],
})
export class AdminModule {}
