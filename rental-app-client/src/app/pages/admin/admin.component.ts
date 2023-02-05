import {Component} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {Property} from "../../model/property";
import {Observable} from "rxjs";
import NetworkState from "../../model/networkState";
import PropertyResponse from "../../model/propertyResponse";
import PropertyNoMetaDataResponse from "../../model/PropertyNoMetaDataResponse";

@Component({
  selector: 'app-admin',
  template: `
    <section>
      <h1
        class="mb-4 max-w-1xl text-2xl font-bold leading-none md:text-2xl xl:text-4xl dark:text-white text-center"
      >
        Properties to review
      </h1>

      <div *ngIf="(networkState$ | async) as state">

        <div *ngIf="state.loading">
          Loading Data
        </div>

        <div *ngIf="state.error">
          Error Loading Data
        </div>

        <div *ngIf="state.data!== undefined && state.data!= null ">
          <div *ngIf="(state.data?.data || []).length !== 0" class="grid grid-cols-4">
            <div *ngFor="let property of state.data?.data" class="col-span-1">
              <admin-app-card [property]="property"/>
            </div>
          </div>
        </div>

        <div *ngIf="(state.data?.data?.length || 0) === 0;">
          <h1>No properties left to review</h1>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class AdminComponent {
  networkState$!: Observable<NetworkState<PropertyNoMetaDataResponse>>;

  constructor(private adminService: AdminService) {
    this.networkState$ = adminService.state$;
    this.adminService.getProperties(false);
  }


}
