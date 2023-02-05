import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { Property } from 'src/app/model/property';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property',
  template: `
    <!-- <div class="container flex justify-left">
      <div class="md:container md:mx-left md:h-96 md:w-1/3">
        <app-carousel
          [images]="property.propertyImages"
          [styles]="carouselStyle"
        ></app-carousel>
      </div>
      <div class="md:container md:mx-right md:h-96 md:w-2/3 md:ml-5">
        {{ property.name }}
      </div>
    </div> -->

    <div class="flex">
      <div class="w-2/5">
        <app-carousel
          [images]="property.propertyImages"
          [styles]="carouselStyle"
        ></app-carousel>
      </div>
      <div class="w-3/5 ml-1">
        <div>{{ property.name }}</div>
      </div>
    </div>
  `,
  styles: [],
})
export class PropertyComponent {
  property!: Property;
  router = inject(Router);
  carouselStyle: {
    height: string;
  } = {
    height: ' md:h-screen',
  };
  activatedRoute = inject(ActivatedRoute);
  propertyService = inject(PropertyService);

  constructor() {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('property_id') as string),
        mergeMap((property_id) =>
          this.propertyService.getPropertyById(property_id)
        )
      )
      .subscribe((response) => {
        this.property = response.data as Property;
        console.log(this.property);
      });
  }
}
