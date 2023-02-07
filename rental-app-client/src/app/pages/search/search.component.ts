import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-search',
  template: `
    <section>
      <h1
        class="mb-4 max-w-1xl text-2xl font-bold leading-none md:text-2xl xl:text-4xl dark:text-white text-center"
      >
        Search Results
      </h1>
          <div *ngIf="properties.length !==0 && properties;else notFound" class="grid grid-cols-4">
            <div  *ngFor="let property of properties" class="col-span-1 m-5">
              <app-card [cardData]="property" 
              [callBackFn]="viewMore.bind(this)" 
              textData="View"/>
            </div>
          </div>
    </section>
    <ng-template #notFound>
      <p>Not found</p>
    </ng-template>

  `,
  styles: [],
})
export class SearchComponent {
  propertyService = inject(PropertyService);
  properties!: Property[];
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  constructor() {
    this.activatedRoute.queryParams.subscribe((param) => {
      const name: string = param['name'];
      if (name) {
        this.propertyService.getAllProprties(name).subscribe((response) => {
          this.properties = response.properties;
          console.log(this.properties);
        });
      }
    });
  }
  viewMore(_id: string) {
    this.router.navigate(['', 'properties', `${_id}`]);
  }
}
