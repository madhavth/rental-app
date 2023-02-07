import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import {catchError, of} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  isLoggingIn = false;

  toastService = inject(ToastrService);
  userService = inject(UserService);
  router = inject(Router);
  loginForm = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  login() {
    this.isLoggingIn = true;

    this.userService.login(this.loginForm.value as User).pipe(
      catchError((err)=> {
        this.isLoggingIn = false;
        return of({success: false, data: err});
      })
    ).subscribe((res) => {
      this.isLoggingIn = false;
      if (res.success) {
        const decoded: User = jwtDecode(res.data);

        this.toastService.success(`Welcome, ${decoded.firstName} ${decoded.lastName}` , 'Logged In Successfully',
          );

        this.userService.setUserState({
          token: res.data,
          email: decoded.email,
          role: decoded.role,
        });
        localStorage.setItem(
          'USER_STATE',
          JSON.stringify({
            token: res.data,
            ...decoded,
          })
        );
        this.router.navigate(decoded.role === 'admin' ? ['', 'admin'] : ['']);
      }
      else {
        this.toastService.error("Invalid Credentials", "Login Failed");
      }
    });
  }
}
