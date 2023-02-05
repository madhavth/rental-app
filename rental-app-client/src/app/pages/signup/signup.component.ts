import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent {
  userService = inject(UserService);
  router = inject(Router);
  signupForm = inject(FormBuilder).nonNullable.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required],
  });
  signup() {
    this.userService.signup(this.signupForm.value as User).subscribe((data) => {
      if (data.success) this.router.navigate(['', 'login']);
    });
  }
}
