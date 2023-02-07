import { Component, inject, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { Property } from 'src/app/model/property';
import { Review } from 'src/app/model/review';
import { Schedule } from 'src/app/model/schedule';
import { User } from 'src/app/model/user';
import { PropertyService } from 'src/app/services/property.service';
import { Utils } from 'src/app/utils/Utils';

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
       
      <div class="flex w-4/5">
      <div class="w-2/5 flex justify-start">
        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {{ property.name }}
        </h5>
      </div>
      <div *ngIf="property.user_id !== user.userId" class="w-3/5 flex justify-end">
      <button type="submit" (click)="addToFavorites()"  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Add to Favorites</button>
      </div>    
    </div>  
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
            {{property.description}}
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
        <button *ngIf="property.user_id !== user.userId"
        data-modal-target="medium-modal" data-modal-toggle="medium-modal" class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
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
      <div *ngIf="property.user_id !== user.userId" class="w-3/5 flex justify-end">
      <button type="submit" data-modal-target="defaultModal" data-modal-toggle="defaultModal"  class="focus:outline-none text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Add Review</button>
      </div>    
    </div>  
    <div *ngFor="let item of property.reviews" class="w-4/5 mx-auto">
      <app-review [reviewData]="item"/>
    </div>
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
    <div class="relative w-full h-full max-w-2xl md:h-auto">
        <!-- Modal content -->
        <div [formGroup]="reviewForm" class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Add Review
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <div>
                    <label for="comment"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
                    <input name="comment" formControlName="comment" id="comment" placeholder="Write your comment" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
              </div>
              <div>
                    <label for="rating" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                    <input name="rating" id="rating" formControlName="rating" type="number" min="1" max="5" placeholder="Write your rating" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
              </div>
            </div>
            
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="defaultModal" (click)="reviewProperty()" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                <button data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
            </div>
        </div>
    </div>
</div>
<div id="medium-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
   <div class="relative w-full h-full max-w-lg md:h-auto">

   <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
   <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                 Schedule An Appointment
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="medium-modal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span> 
                </button>
            </div>

     <app-schedular></app-schedular>
   </div>
   </div>
    </div>
  `,
  styles: [],
})
export class PropertyComponent {
  property!: Property;
  router = inject(Router);
  propertyService = inject(PropertyService);
  userData = localStorage.getItem('USER_STATE');
  user = JSON.parse(this.userData!);
  reviewForm = inject(FormBuilder).nonNullable.group({
    rating: '',
    comment: '',
    user_id: `${this.user.firstName + ' ' + this.user.lastName}`,
  });

  reviewProperty() {
    this.propertyService
      .reviewProperty(
        this.property._id!,
        this.reviewForm.value as unknown as Review
      )
      .subscribe((data) => {
        if (data.success) this.router.navigate(['']);
      });
  }
  addToFavorites() {
    this.propertyService
      .addToFavorites(this.property._id!)
      .subscribe((data) => {
        if (data.success)
          this.router.navigate(['', 'properties', this.property._id]);
      });
  }
  carouselStyle: {
    height: string;
  } = {
    height: ' md:h-96',
  };
  activatedRoute = inject(ActivatedRoute);

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
        this.property.reviews?.forEach((data) => {
          data.ratingArray = Utils.convertNumToArray(data.rating).arr;
        });
      });
  }
}
