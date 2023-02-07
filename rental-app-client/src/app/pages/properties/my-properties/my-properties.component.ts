import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-properties',
  template: `
    <div class="relative overflow-x-auto m-auto">
      <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
      >
        My Properties
      </h1>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3">Image</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="let data of properties"
            class="bg-white border-b h-54 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="w-32 p-4">
              {{ data.name }}
            </td>
            <td class="w-32 p-4">
              {{ data.description | slice : 0 : 50 }}{{ '....' }}
            </td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              <div>
                <app-carousel
                  [images]="data.propertyImages"
                  [styles]="carouselStyle"
                ></app-carousel>
              </div>
            </td>
            <td class="w-32 p-4">
              {{ data.is_verified ? 'Verified' : '' }}
              <br />
              {{ data.is_rented ? 'Already Rented' : 'Not Rented' }}
              <br />
              {{ data.is_rejected ? 'Rejected' : '' }}
            </td>
            <td class="w-32 p-4">
              {{ '$' + data.price }}
            </td>
            <td class="w-32 p-4">
              <a
                [routerLink]="['', 'properties', data._id]"
                class="font-medium text-red-600 dark:text-red-500 hover:underline"
                >View Details</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class MyPropertiesComponent {
  userService = inject(UserService);
  router = inject(Router);
  properties!: Property[];
  constructor() {
    this.userService.myProperties().subscribe((response) => {
      this.properties = response.data.properties;
    });
  }
  carouselStyle: {
    height: string;
  } = {
    height: ' md:h-54',
  };
}
