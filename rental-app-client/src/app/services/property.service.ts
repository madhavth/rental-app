import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Property } from '../model/property';
import { MetaData } from '../model/metaData';
import { map } from 'rxjs';
import { Review } from '../model/review';

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

  reviewProperty(_id: string, payload: Review) {
    return this.http.post<{ success: boolean; message: string }>(
      `${environment.SERVER}/properties/${_id}/reviews`,
      payload
    );
  }

  addToFavorites(property_id: string) {
    return this.http.post<{ success: boolean; message: string }>(
      `${environment.SERVER}/users/favorites`,
      { property_id }
    );
  }
  getAllFavorites() {
    return this.http.get<{ success: boolean; data: Property[] }>(
      `${environment.SERVER}/users/favorites`
    );
  }

  removeFromFavorites(property_id: string) {
    console.log(property_id);
    return this.http.delete<{ success: boolean; message: string }>(
      `${environment.SERVER}/users/favorites/${property_id}`
    );
  }

  updateProperty() {}

  addProperties() {}
}
