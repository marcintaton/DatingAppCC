import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import User from '../types/interfaces/user';

@Injectable()
export class AuthorizaionInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userString = localStorage.getItem('user');
    if (!userString) return next.handle(request);

    const user = JSON.parse(userString!) as User;

    return next.handle(
      request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + user.token,
        },
      })
    );
  }
}
