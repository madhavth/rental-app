import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  userData = localStorage.getItem('USER_STATE');
  userService = inject(UserService);

  isLoggedIn$ = this.userService.getUserLoginState$;

  router = inject(Router);
  constructor() {}

  logout() {
    localStorage.removeItem('USER_STATE');
    this.userService.setUserState({
      jwt: '',
      _id: '',
      email: '',
      firstName: '',
      lastName: '',
    } as User);
    this.router.navigate(['', 'login']);
  }
}
