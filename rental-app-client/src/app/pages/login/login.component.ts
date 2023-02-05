import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  router = inject(Router);
  loginForm = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  login() {
    console.log(this.loginForm.value);
    this.router.navigate(['']);
  }
}
