import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.userService.userState.value.token;
    if (token) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }
  }
}
