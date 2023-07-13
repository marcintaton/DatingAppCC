import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import User from '../types/interfaces/user';
import { AccountService } from '../services/account.service';

@Injectable()
export class AuthorizaionInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user)
          request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' + user.token,
            },
          });
      },
    });

    return next.handle(request);
  }
}
