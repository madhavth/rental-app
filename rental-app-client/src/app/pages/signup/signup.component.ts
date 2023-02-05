import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent {
  router = inject(Router);
  signupForm = inject(FormBuilder).nonNullable.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required],
  });
  signup() {
    console.log(this.signupForm.value);
    this.router.navigate(['', 'login']);
  }
}
