import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import {Toast, ToastrService} from "ngx-toastr";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent {
  toastService =inject(ToastrService);
  userService = inject(UserService);
  router = inject(Router);
  signupForm = inject(FormBuilder).nonNullable.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required],
  });

  isSigningUp = false;

  signup() {
    this.isSigningUp = true;

    this.userService.signup(this.signupForm.value as User).pipe(
      catchError((err)=> {
        this.isSigningUp = false;
        return of({success: false, data: err});
      })
    ).subscribe((data) => {
      this.isSigningUp = false;
      if (data.success) {
        this.toastService.success("Account Created Successfully", "Signup Successful");
        this.router.navigate(['', 'login']);
      }
      else {
        this.toastService.error("Something went wrong Signup", "Signup Failed");
      }
    });
  }
}
