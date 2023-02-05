import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import PropertyResponse from "../model/propertyResponse";
import {BehaviorSubject, Observable} from "rxjs";
import NetworkState from "../model/networkState";
import {environment} from "../../environments/environment.development";
import PropertyNoMetaDataResponse from "../model/PropertyNoMetaDataResponse";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _state = new BehaviorSubject<NetworkState<PropertyNoMetaDataResponse>>({
    loading: true,
    error: false,
    message: ''
  });

  state$ = this._state.asObservable();

  properties!: PropertyNoMetaDataResponse;


  constructor(private httpClient: HttpClient) {
  }

  getProperties(isVerified?: boolean) {
    const params = <{ is_verified: boolean }>{};

    if (isVerified !== undefined) {
      params.is_verified = isVerified;
    }

    try {
      this._state.next({
        loading: true,
        error: false
      });

      this.httpClient.get<PropertyNoMetaDataResponse>(`${environment.SERVER}/admin/properties`, {
          params: params
        }
      ).subscribe((response) => {
          this.properties = response;
          this._state.next({
            loading: false,
            error: false,
            data: response
          })
        },
      );
    } catch (e) {
      this._state.next({
        loading: false,
        error: true,
      });
    }
  }

  updatePropertyVerificationStatus(propertyId?: string, isVerified?: boolean) {
    return this.httpClient.patch(`${environment.SERVER}/admin/properties/` + propertyId, {
      is_verified: isVerified
    });
  }

}
