import { Component, inject } from '@angular/core';
import { Property } from 'src/app/model/property';
import { PropertyService } from 'src/app/services/property.service';
import { Utils } from 'src/app/utils/Utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <section class="bg-white dark:bg-gray-900">
      <div
        class="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
      >
        <div class="place-self-center mr-auto lg:col-span-7">
          <h1
            class="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white"
          >
            Find the properties you are looking for
          </h1>
          <p
            class="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
          >
            From flats, apartments to rental houses. We offer you the best deal
            for renting the property of your choice
          </p>
          <a
            *ngIf="!user"
            [routerLink]="['', 'signup']"
            class="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Get started
            <svg
              class="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            [routerLink]="['', 'login']"
            *ngIf="!user"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Find the deals
          </a>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://www.propertyneedsyou.com/static/44e6d58d0564020236f3bf43a306ce84/b75ff/pny-banner-highrises-crop.png"
            alt="mockup"
          />
        </div>
      </div>
    </section>
    <section>
      <h1
        class="mb-4 max-w-1xl text-2xl font-bold leading-none md:text-2xl xl:text-4xl dark:text-white text-center"
      >
        What's Trending?
      </h1>
      <app-slider
        sliderName="trendingSlider"
        [items]="properties"
        [callBackFn]="navigateTo"
      ></app-slider>
    </section>

    <section>
      <h1
        class="mb-4 max-w-1xl text-2xl font-bold leading-none md:text-2xl xl:text-4xl dark:text-white text-center"
      >
        Properties Nearby
      </h1>
      <app-slider
        sliderName="nearBySlider"
        [items]="properties2"
        [callBackFn]="navigateTo"
      ></app-slider>
    </section>
  `,
  styles: [
    `
      .bg-primary-700 {
        --tw-bg-opacity: 1;
        background-color: rgb(29 78 216 / var(--tw-bg-opacity));
      }
    `,
  ],
})
export class HomeComponent {
  userData = localStorage.getItem('USER_STATE');
  user = JSON.parse(this.userData!);
  propertyService = inject(PropertyService);
  router = inject(Router);
  properties: Property[] | undefined = [];
  properties2: Property[] | undefined = [];
  constructor() {
    if (this.properties?.length === 0) {
      this.propertyService.getTrendingProperties().subscribe((response) => {
        this.properties = response.data.properties;
        this.properties.forEach((property) => {
          property.avgRating = {
            ...property.avgRating,
            ...Utils.convertNumToArray(
              Utils.calculatePropertyAverage(property.reviews)
            ),
          };
        });
      });
    }
    if (this.properties2?.length === 0) {
      this.propertyService.getNearByProperties().subscribe((response) => {
        this.properties2 = response.data.properties;
        this.properties2.forEach((property) => {
          property.avgRating = {
            ...property.avgRating,
            ...Utils.convertNumToArray(
              Utils.calculatePropertyAverage(property.reviews)
            ),
          };
        });
      });
    }
  }

  navigateTo(_id: string) {
    this.router.navigate(['', 'properties', `${_id}`]);
  }
}
