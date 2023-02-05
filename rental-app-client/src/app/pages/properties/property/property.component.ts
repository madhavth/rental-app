import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { Property } from 'src/app/model/property';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property',
  template: `
    <div class="flex w-4/5 mx-auto">
      <div class="w-2/5">
        <app-carousel
          [images]="property.propertyImages"
          [styles]="carouselStyle"
        ></app-carousel>
      </div>
      <div class="w-3/5 ml-3.5">
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          {{ property.name }} Ram ko ghar
        </h5>
        <div class="flex items-baseline text-gray-900 dark:text-white">
          <span class="text-3xl font-semibold">$</span>
          <span class="text-5xl font-extrabold tracking-tight"
            >{{ property.price }} </span
          >
          <span
            class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400"
            >/month</span
          >
        </div>
        <div>
          <p class="my-4 font-light">
            This is the description of this property This is the description of
            this property This is the description of this property This is the
            description of this property This is the description of this
            property This is the description of this property This is the
            description of this property
          </p>
        </div>
        <div>Location</div>
        <ul role="list" class="space-y-5 my-7">
          <h5>Amenities</h5>
          <li class="flex space-x-3">
            <!-- Icon -->
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Bedrooms</title>
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
              >Bedrooms - {{ property.property_features.bedrooms }}</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Bathrooms</title>
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
              >Bathrooms - {{ property.property_features.bathrooms }}</span
            >
          </li>
          <li class="flex space-x-3">
            <!-- Icon -->
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Beds</title>
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
              >Beds - {{ property.property_features.beds }}</span
            >
          </li>
        </ul>
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Schedule an appointment
        </button>
      </div>
    </div>
    <div class="flex w-4/5 mx-auto">
      <div class="w-2/5 flex justify-start">
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          Reviews
        </h5>
      </div>
      <div class="w-3/5 flex justify-end">
      <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Add Review</button>

      </div>    
    </div>  
    <div class="w-4/5 mx-auto">
      <app-review/>
      <app-review/>
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
    height: ' md:h-96',
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
