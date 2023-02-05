import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Property } from '../model/property';
import { MetaData } from '../model/metaData';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient) {}

  propertyData: { properties?: Array<Property>; metaData?: MetaData } = {
    properties: [],
    metaData: {},
  };

  getAllProprties() {
    return this.http
      .get<{
        success: boolean;
        data: { properties: Array<Property>; metadata: MetaData };
      }>(`${environment.SERVER}/properties`)
      .pipe(map((response) => response.data));
  }

  getNearByProperties() {
    return this.http.get(`${environment.SERVER}/properties/nearby`);
  }

  getTrendingProperties() {
    return this.http.get(`${environment.SERVER}/properties/trending`);
  }

  getPropertyById(_id: string) {
    return this.http.get<{ success: boolean; data: Property }>(
      `${environment.SERVER}/properties/${_id}`
    );
  }

  deletePropertyById(_id: string) {
    return this.http.delete(`${environment.SERVER}/properties/${_id}`);
  }

  updateProperty() {}

  addProperties() {}
}
