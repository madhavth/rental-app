import { Component, inject, Input } from '@angular/core';
import { Property } from 'src/app/model/property';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <app-carousel
        [images]="cardData.propertyImages"
        [styles]="carouselStyle"
      ></app-carousel>

      <div class="p-5">
        <div class="flex items-center justify-end">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#BDBDBD"
              class="w-5"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
              />
            </svg>
          </div>
          <div>
            {{ cardData.view_count }}
          </div>
        </div>
        <div class="flex items-center mt-2.5 mb-5">
          <svg
            *ngFor="let rating of cardData.avgRating?.arr"
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
            >{{ cardData.avgRating?.rating | number : '0.1' }}</span
          >
        </div>
        <a href="#">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ cardData.name }}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ cardData.description | slice : 0 : 100 }}{{ '....' }}
        </p>
        <div class="flex items-center justify-between">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ '$' + cardData.price }}
          </span>
          <button
            (click)="callBackFn(cardData._id)"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {{ textData }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CardComponent {
  @Input() cardData!: Property;
  @Input() callBackFn!: Function;
  @Input() textData!: string;
  router = inject(Router);
  carouselStyle: {
    height: string;
  } = {
    height: ' md:h-48',
  };
}
