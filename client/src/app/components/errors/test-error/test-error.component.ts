import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import UserPwd from 'src/app/types/interfaces/userPwd';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent {
  baseUrl: string = 'http://localhost:7013/api';
  validationErrors: string[] = [];

  constructor(private http: HttpClient) {}

  get404() {
    this.http.get(this.baseUrl + '/errordispenser/not-found').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get400() {
    this.http.get(this.baseUrl + '/errordispenser/bad-request').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get500() {
    this.http.get(this.baseUrl + '/errordispenser/server-error').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get401() {
    this.http.get(this.baseUrl + '/errordispenser/auth').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  get400ValidationError() {
    this.http
      .post(this.baseUrl + '/account/register', {
        // username: 'Test',
        // password: 'asd',
      } as UserPwd)
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => {
          console.log(err);
          this.validationErrors = err;
        },
      });
  }
}
