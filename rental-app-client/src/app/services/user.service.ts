import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MetaData } from '../model/metaData';
import { Property } from '../model/property';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userState: BehaviorSubject<User> = new BehaviorSubject({
    jwt: '',
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
  } as User);

  private userLoginState = new BehaviorSubject<{
    role: string;
    isLoggedIn: boolean;
  }>({ role: '', isLoggedIn: false });

  getUserLoginState$ = this.userLoginState.asObservable();

  getUserState$ = this.userState.asObservable();

  setUserState(user: User) {
    let setState = { role: '', isLoggedIn: false };
    if (user.token !== undefined && user.token) {
      setState = {
        role: user.role!,
        isLoggedIn: true,
      };
    }
    this.userLoginState.next(setState);
    this.userState.next(user);
  }

  constructor(private http: HttpClient) {}
  login(payload: User) {
    return this.http.post<{ success: boolean; data: string }>(
      `${environment.SERVER}/users/login`,
      payload
    );
  }
  signup(payload: User) {
    return this.http.post<{ success: boolean; data: string }>(
      `${environment.SERVER}/users/signup`,
      payload
    );
  }

  myProperties() {
    return this.http.get<{
      success: boolean;
      data: { properties: Property[]; metadata: MetaData };
    }>(`${environment.SERVER}/users/properties`);
  }
}
