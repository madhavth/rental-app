import {Component, inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {PropertyService} from 'src/app/services/property.service';
import {ToastrService} from "ngx-toastr";
import {mergeMap, pipe, tap} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  template: `
    <div class="container w-4/5 m-auto mt-5 mb-5 justify-around">
      <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
      >
        Add New Property
      </h1>
      <div class="mt-5">
        <form (ngSubmit)="submitForm()" [formGroup]="myFormData">
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class=" z-0 w-full mb-6 group">
              <label
                for="propertyName"
                class="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Property Name</label
              >
              <input
                formControlName="property_name"
                type="text"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="propertyName"
                id="propertyName"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
                placeholder=" "
              />
            </div>
            <div class=" z-0 w-full mb-6 group">
              <label
                for="price"
                class="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Price</label
              >
              <input
                formControlName="price"
                type="number"
                name="price"
                id="price"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class=" z-0 w-full mb-6 group">
              <label
                for="address"
                class="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Address</label
              >
              <input
                formControlName="address"
                type="text"
                name="address"
                id="address"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
            <div class=" z-0 w-full mb-6 group">
              <label
                for="type"
                class="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Type of Property</label
              >
              <input
                formControlName="type"
                type="text"
                name="type"
                id="type"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
          </div>
          <div class=" z-0 w-full mb-6 group">
            <label
              for="description"
              class="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Description</label
            >
            <textarea
              formControlName="description"
              id="description"
              name="description"
              rows="4"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            ></textarea>
          </div>
          <div class="grid md:grid-cols-3 md:gap-4">
            <div class=" z-0 w-full mb-4 group">
              <label
                for="bedroom"
                class="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >No. of Bedrooms</label
              >
              <input
                formControlName="no_of_bedrooms"
                type="number"
                name="bedroom"
                id="bedroom"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
            <div class=" z-0 w-full mb-4 group">
              <label
                for="bathroom"
                class="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >No. of Bathrooms</label
              >
              <input
                formControlName="no_of_bathrooms"
                type="number"
                name="bathroom"
                id="bathroom"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
            <div class=" z-0 w-full mb-4 group">
              <label
                for="type"
                class="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >No. of Beds</label
              >
              <input
                formControlName="no_of_beds"
                type="number"
                name="bed"
                id="bed"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
            </div>
          </div>

          <div class=" z-0 w-full mb-6 group">
            <label
              for="propertyImages"
              class="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Property Images</label
            >
            <input
              type="file"
              (change)="updateSelectedFiles($event)"
              name="propertyImages"
              id="propertyImages"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              multiple
              required
            />
          </div>

          <div class=" z-0 w-full mb-6 group">
            <label
              for="map"
              class="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Map</label
            >
            <div name="map"
                 class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
              <app-map (markerChangeCallBack)="markerChanged"/>
            </div>
          </div>


          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class AddPropertyComponent {
  markers: { lat: number; lng: number } = {lat: 0, lng: 0};
  propertyService = inject(PropertyService);

  myFormData = inject(FormBuilder).group({
    property_name: '',
    price: 0,
    address: '',
    property_type: '',
    description: '',
    no_of_bedrooms: 0,
    no_of_bathrooms: 0,
    no_of_beds: 0,
  });

  selectedFiles!: FileList;

  constructor(private toastService: ToastrService, private router: Router) {
  }

  updateSelectedFiles(event: any) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  submitForm() {
    console.log(this.myFormData.value);

    const combined = this.propertyService.uploadImages(this.selectedFiles).pipe(
      mergeMap((response) => {
        return this.propertyService.addProperties(this.myFormData, this.markers, response.data);
      })
    )

    combined.subscribe((response) => {
      if (response.success) {
        this.toastService.success(response.message, 'Success');
        this.router.navigate(['', 'properties', 'my']);
      }
      else {
        this.toastService.error(response.message, 'Error');
      }

    });
  }

  markerChanged(marker: { lat: number, lng: number }) {
    this.markers = marker;
  }
}
