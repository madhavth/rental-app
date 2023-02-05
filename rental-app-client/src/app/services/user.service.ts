import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
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

  getUserState$ = this.userState.asObservable();
  setUserState(user: User) {
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
}
