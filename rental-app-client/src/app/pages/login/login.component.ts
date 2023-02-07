import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  userService = inject(UserService);
  router = inject(Router);
  loginForm = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  login() {
    this.userService.login(this.loginForm.value as User).subscribe((res) => {
      if (res.success) {
        const decoded: User = jwtDecode(res.data);
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
    });
  }
}
