import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import User from 'src/types/interfaces/user';
import UserPwd from 'src/types/interfaces/userPwd';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'http://localhost:7013/api';
  private userLsKey: string = 'user';

  private userSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: UserPwd) {
    return this.http.post<User>(`${this.baseUrl}/account/login`, model).pipe(
      map((r: User) => {
        const user = r;
        if (user) {
          localStorage.setItem(this.userLsKey, JSON.stringify(user));
          this.setUser(user);
        }
      })
    );
  }

  register(model: UserPwd) {
    return this.http.post<User>(this.baseUrl + '/account/register', model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem(this.userLsKey, JSON.stringify(user));
          this.setUser(user);
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem(this.userLsKey);
    this.setUser(null);
  }

  setUser(user: User | null) {
    this.userSource.next(user);
  }
}
