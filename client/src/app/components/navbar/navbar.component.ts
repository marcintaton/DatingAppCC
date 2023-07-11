import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import UserPwd from 'src/types/interfaces/userPwd';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  model: UserPwd = {} as UserPwd;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  logIn() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      complete: () => {
        this.model = {} as UserPwd;
        this.router.navigateByUrl('/members');
      },
    });
  }

  logOut() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  hasLocation(query: string): boolean {
    return this.router.url.search(query) != -1;
  }
}
