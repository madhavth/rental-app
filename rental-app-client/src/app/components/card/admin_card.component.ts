import { Component, inject, Input, Output } from '@angular/core';
import { Property } from 'src/app/model/property';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'admin-app-card',
  template: `
    <div
      class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <admin-app-carousel
        [images]="property.propertyImages"
        [styles]="carouselStyle"
      ></admin-app-carousel>

      <div class="p-5">
        <div class="flex items-center mt-2.5 mb-5">
          <svg
            *ngFor="let rating of property.avgRating?.arr"
            aria-hidden="true"
            class="{{
              rating > 0 ? 'w-5 h-5 text-yellow-300' : 'w-5 h-5 text-gray-300'
            }}"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{{ rating }}</title>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>

          <span
            class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
            >{{ property.avgRating?.rating }}</span
          >
        </div>
        <a href="#">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ property.name }}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ property.description | slice : 0 : 100 }}{{ '....' }}
        </p>
        <div class="flex items-center justify-between">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ '$' + property.price }}
          </span>
        </div>

        <div class="flex justify-between mt-5">
          <button
            class="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full"
            (click)="acceptProperty(property._id)"
            [disabled]="loading"
          >
            <span class="fas fa-check"></span>
            Accept
          </button>

          <button
            class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full"
            (click)="rejectProperty(property._id)"
            [disabled]="loading"
          >
            <span class="fas fa-times"></span>
            Reject
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AdminCardComponent {
  @Input() property!: Property;

  loading = false;

  router = inject(Router);
  carouselStyle: {
    height: string;
  } = {
    height: ' md:h-48',
  };

  constructor(private adminService: AdminService) {}

  acceptProperty(propertyId?: string) {
    this.loading = true;
    this.adminService
      .updatePropertyVerificationStatus(propertyId, true)
      .subscribe((value) => {
        this.loading = false;
        this.adminService.getProperties(false);
      });
  }

  rejectProperty(propertyId?: string) {
    this.loading = true;
    this.adminService
      .updatePropertyVerificationStatus(propertyId, false)
      .subscribe((value) => {
        this.loading = false;
        this.adminService.getProperties(false);
      });
  }
}
