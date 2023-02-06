import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-favorite-properties',
  template: `
  <div class="flex">
    <div class="flex items-center mr-4" *ngFor="let item of favorites">    
  <app-card       
      [cardData]="item"
      [callBackFn]="removeFavorites.bind(this)" 
      textData="Remove"
      />
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
      console.log(this.favorites);
    });
  }
  removeFavorites(property_id: string) {
    this.propertyService
      .removeFromFavorites(property_id)
      .subscribe((response) => {
        this.propertyService.getAllFavorites().subscribe((response) => {
          this.favorites = response.data;
        });
        console.log(response);
      });
  }
}
