import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/model/review';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-review',
  template: `
    <article class="mb-6">
      <div class="flex items-center mb-6 space-x-4 ">
        <div
          class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div>{{ reviewData.user_id }}</div>
      </div>
      <div class="flex items-center mb-1">
        <svg
          *ngFor="let rating of reviewData.ratingArray"
          aria-hidden="true"
          class="{{
            rating > 0 ? 'w-5 h-5 text-yellow-300' : 'w-5 h-5 text-gray-300'
          }}"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{{ reviewData.rating }}</title>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
        <h3 class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
          {{ reviewData.comment }}
        </h3>
      </div>
    </article>
  `,
  styles: [],
})
export class ReviewComponent {
  @Input() reviewData!: Review;

  arr!: Array<number>;
  router = inject(Router);
}
