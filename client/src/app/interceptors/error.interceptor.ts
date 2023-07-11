import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          switch (err.status) {
            case 400:
              if (err.error.errors) {
                const modelStateErrors = [];
                for (const key in err.error.errors) {
                  if (err.error.errors[key]) {
                    modelStateErrors.push(err.error.errors[key]);
                  }
                }
                // ???
                this.snackBar.open(`${modelStateErrors[0]} ${err.status}`);
                throw modelStateErrors.flat();
              } else {
                this.snackBar.open(`${err.error} ${err.status}`);
              }
              break;
            case 401:
              this.snackBar.open(`Unauthorized ${err.status}`);
              break;
            case 404:
              this.snackBar.open(`Not found ${err.status}`);
              this.router.navigateByUrl('not-found');
              break;
            case 500:
              const navExtras: NavigationExtras = {
                state: { error: err.error },
              };
              this.router.navigateByUrl('server-error', navExtras);
              break;
            default:
              this.snackBar.open(`Something unexpected went wrong`);
              console.log(err);
              break;
          }
        }
        throw err;
      })
    );
  }
}
