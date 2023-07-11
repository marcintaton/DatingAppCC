import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import User from 'src/types/interfaces/user';
import UserPwd from 'src/types/interfaces/userPwd';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  model: UserPwd = {} as UserPwd;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  logIn() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => console.log(error),
      complete: () => {
        this.model = {} as UserPwd;
      },
    });
  }

  logOut() {
    this.accountService.logout();
  }
}
