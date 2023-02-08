import {Component, inject, Input} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, map, mergeMap, of} from 'rxjs';
import {Property} from 'src/app/model/property';
import {Review} from 'src/app/model/review';
import {Schedule} from 'src/app/model/schedule';
import {PropertyService} from 'src/app/services/property.service';
import {ScheduleService} from 'src/app/services/schedule.service';
import {Utils} from 'src/app/utils/Utils';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-property',
  template: `
    <div class="px-16">

      <div class="flex space-x-10 mt-6">
        <div class="w-10/12" *ngIf="property">
          <app-carousel
            [images]="property!.propertyImages"
            [styles]="carouselStyle"
          ></app-carousel>
        </div>
        <div class="w-3/5 ml-3.5">
          <div class="flex  mt-5">
            <div class="w-2/5 flex justify-start">
              <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                {{ property.name }}
              </h5>
            </div>
            <div
              *ngIf="user && property.user_id !== user.userId"
              class="w-3/5 flex justify-end"
            >

              <app-spinner *ngIf="isAddingToFavorite" class="px-5 py-2.5 mr-2 mb-2"></app-spinner>

              <button
                type="submit"
                *ngIf="!isAddingToFavorite"
                (click)="addToFavorites()"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Add to Favorites
              </button>
            </div>
          </div>
          <div class="flex items-baseline text-gray-900 dark:text-white">
            <span class="text-3xl font-semibold">$</span>
            <span class="text-5xl font-extrabold tracking-tight"
            >{{ property.price }}
      </span>
            <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400"
            >/month</span
            >
          </div>
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

            <li>
              <div class="flex items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#BDBDBD"
                    class="w-5"
                  >
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path
                      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                    />
                  </svg>
                </div>
                <div>{{ property.view_count}} views</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="mx-auto mt-10">
        <label for="rent_status">Status: </label>
        <div *ngIf="user && property.user_id === user.userId">
          <select name="rent_status" [(ngModel)]="selectedOption" (change)="changedSelection()">
            <option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>
          </select>
        </div>

      </div>

      <div class=" mx-auto mt-10">
        <div>
          <span class="text-3xl tracking-tight"> Description </span>
        </div>

        <div>
          <p class="my-4 font-light">{{property.description}}</p>
        </div>
      </div>

      <div class="mx-auto">
        <div>
          <span class="text-3xl tracking-tight"> Location </span>
        </div>
        <div class="" *ngIf="(property && property.location) as locations">
          <app-map
            [markerPosition]="{lat: locations[0], lng: locations[1]}"
            [isReadOnly]="true"
            style="
        width: 100%;
        height: 300px;
        display: inline-block;
        margin-top: 12px;
        margin-bottom: 12px;
      "
          ></app-map>
        </div>
      </div>

      <div *ngIf="user && property.user_id !== user.userId" class="flex space-x-4">
        <div
          [formGroup]="reviewForm"
          class="relative bg-white rounded-lg shadow dark:bg-gray-700 mx-auto w-1/2"
        >
          <div class="p-6 space-y-6">
            <span class="text-2xl">Add your Review</span>
            <div>
              <label
                for="comment"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Comment</label
              >
              <input
                name="comment"
                formControlName="comment"
                id="comment"
                placeholder="Write your comment"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                for="rating"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Rating</label
              >
              <input
                name="rating"
                id="rating"
                formControlName="rating"
                type="number"
                min="1"
                max="5"
                placeholder="Write your rating"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <button
              (click)="reviewProperty()"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </div>
        <div
          class="relative bg-white rounded-lg shadow dark:bg-gray-700 mx-auto w-1/2 p-4"
        >
          <span class="text-2xl">Schedule an appointment</span>
          <app-schedular [callBackFn]="addSchedule.bind(this)"></app-schedular>
        </div>
      </div>

      <div class="flex mt-5 mx-auto">
        <div class=" flex justify-start">
          <h1
            class="mb-4 max-w-2xl text-xl font-bold leading-none md:text-2xl xl:text-3xl dark:text-white"
          >
            Reviews
          </h1>
        </div>
      </div>
      <div *ngFor="let item of property.reviews" class=" mx-auto">
        <app-review [reviewData]="item"/>
      </div>
    </div>

  `,
  styles: [],
})
export class PropertyComponent {
  property!: Property;
  router = inject(Router);
  propertyService = inject(PropertyService);
  scheduleService = inject(ScheduleService);

  options = [
    {label: 'Rented', value: true},
    {label: 'Not Rented', value: false},
  ];

  selectedOption!: boolean;

  userData = localStorage.getItem('USER_STATE');
  user = JSON.parse(this.userData!);
  reviewForm = inject(FormBuilder).nonNullable.group({
    rating: '',
    comment: '',
    user_id: `${this.user?.firstName + ' ' + this.user?.lastName}`,
  });

  constructor() {
    this.fetchDataFromApi();
  }

  fetchDataFromApi() {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('property_id') as string),
        mergeMap((property_id) =>
          this.propertyService.getPropertyById(property_id)
        )
      )
      .subscribe((response) => {
        this.property = response.data as Property;
        this.selectedOption = this.property.is_rented || false;
        this.property.reviews?.forEach((data) => {
          data.ratingArray = Utils.convertNumToArray(data.rating).arr;
        });
      });
  }

  reviewProperty() {
    this.propertyService
      .reviewProperty(
        this.property._id!,
        this.reviewForm.value as unknown as Review
      )
      .subscribe((data) => {
        if (data.success) this.fetchDataFromApi();
      });
  }

  isAddingToFavorite = false;
  toastService = inject(ToastrService);

  addToFavorites() {
    this.isAddingToFavorite = true;

    this.propertyService
      .addToFavorites(this.property._id!)
      .pipe(
        catchError((err) => {
          this.isAddingToFavorite = false;
          return of({success: false, message: err.message});
        })
      )
      .subscribe((data) => {
        this.isAddingToFavorite = false;
        if (data.success) {
          this.toastService.success('Added to favorites', 'Success');
          this.router.navigate(['', 'properties', this.property._id]);
        } else {
          console.log(data);
          this.toastService.error('Could not add to favorites', 'Error');
        }
      });
  }

  carouselStyle: {
    height: string;
  } = {
    height: ' md:h-96',
  };
  activatedRoute = inject(ActivatedRoute);

  addSchedule(payload: Schedule) {
    this.scheduleService
      .makeAnAppointment({...payload, property_id: this.property._id})
      .subscribe((data) => {
      });
  }

  changedSelection() {
    if (this.selectedOption !== this.property.is_rented) {
      this.propertyService.updateProperty(this.property._id!, this.selectedOption)
        .subscribe((data) => {
          if (data.success) {
            this.toastService.success('Property updated successfully', 'Success');
          } else {
            this.toastService.error('Could not update property', 'Error');
          }
        })
    }
  }
}
