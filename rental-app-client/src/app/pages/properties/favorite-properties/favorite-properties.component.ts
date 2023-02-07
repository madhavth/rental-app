import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { PropertyService } from 'src/app/services/property.service';
import {catchError, mergeMap, of} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-favorite-properties',
  template: `
      <div class="relative overflow-x-auto m-5">
    <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
      >
        My Favorites
      </h1>
  <div class="flex mt-5">
    <div class="flex items-center mr-4" *ngFor="let item of favorites">
  <app-card
      [cardData]="item"
      [callBackFn]="removeFavorites.bind(this)"
      textData="Remove"
      />
    </div>
</div>
</div>
  `,
  styles: [],
})
export class FavoritePropertiesComponent {
  propertyService = inject(PropertyService);
  router = inject(Router);
  favorites!: Property[];
  constructor() {
    this.propertyService.getAllFavorites().subscribe((response) => {
      this.favorites = response.data;
    });
  }

  isRemoving = false;
  toastService = inject(ToastrService);

  removeFavorites(property_id: string) {
    this.propertyService
      .removeFromFavorites(property_id)
      .pipe(
    catchError((err)=> {
          this.toastService.error('Something went wrong while removing from favorites', 'Error');
          return of({success: false, data: null});
        }),
      )
      .subscribe((response) => {
        this.toastService.success('Removed from favorites', 'Success');
        this.propertyService.getAllFavorites().subscribe((response) => {
          this.favorites = response.data;
        });
      });
  }
}
