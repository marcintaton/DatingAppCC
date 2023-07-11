import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  logIn() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        if (error.error.errors) {
          if (error.error.errors.Username != null)
            this.toastr.error(error.error.errors.Username[0]);
          else if (error.error.errors.Password != null)
            this.toastr.error(error.error.errors.Password[0]);
        } else {
          this.toastr.error(error.error);
        }
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
