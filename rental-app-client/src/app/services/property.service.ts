import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Property } from '../model/property';
import { MetaData } from '../model/metaData';
import { map } from 'rxjs';
import { Review } from '../model/review';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import IImage from '../model/image';
import PropertyResponse from '../model/propertyResponse';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient, private toastService: ToastrService) {}

  propertyData: { properties?: Array<Property>; metaData?: MetaData } = {
    properties: [],
    metaData: {},
  };

  getAllProprties(name: string) {
    return this.http
      .get<{
        success: boolean;
        data: { properties: Array<Property>; metadata: MetaData };
      }>(`${environment.SERVER}/properties`, {
        params: {
          name: name,
        },
      })
      .pipe(map((response) => response.data));
  }

  getNearByProperties(latitude: number, longitude: number) {
    return this.http.get<PropertyResponse>(
      `${environment.SERVER}/properties/nearby`,
      {
        params: {
          latitude: latitude,
          longitude: longitude,
        },
      }
    );
  }

  getTrendingProperties() {
    return this.http.get<PropertyResponse>(
      `${environment.SERVER}/properties/trending`
    );
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
    return this.http.delete<{ success: boolean; message: string }>(
      `${environment.SERVER}/users/favorites/${property_id}`
    );
  }

  updateProperty(property_id: string, is_rented: boolean) {
    return this.http.patch<{ success: boolean; message: string }>(
      `${environment.SERVER}/properties/${property_id}`,
      {
        is_rented: is_rented
      }
    );
  }

  addProperties(
    formData: FormGroup,
    latLng: { lat: number; lng: number },
    images: { img: string }[]
  ) {
    const property: Property = {
      type: formData.get('type')?.value,
      name: formData.get('property_name')?.value,
      description: formData.get('description')?.value,
      price: formData.get('price')?.value,
      location: [latLng.lat, latLng.lng],
      propertyImages: images,
      property_features: {
        bedrooms: formData.get('no_of_bedrooms')?.value || 0,
        bathrooms: formData.get('no_of_bathrooms')?.value || 0,
        beds: formData.get('no_of_beds')?.value || 0,
      },
    };

    return this.http.post<{ success: boolean; message: string }>(
      `${environment.SERVER}/properties`,
      property
    );
  }

  uploadImages(filesList: FileList) {
    // upload image using multi part form data
    const formData = new FormData();

    for (let i = 0; i < filesList.length; i++) {
      formData.append('image', filesList[i]);
    }

    return this.http.patch<{
      success: boolean;
      message: string;
      data: IImage[];
    }>(`${environment.SERVER}/properties/upload-property-images`, formData);
  }
}
