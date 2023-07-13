import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';
import Member from 'src/app/types/interfaces/member';
import UserPwd from 'src/app/types/interfaces/userPwd';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  model: UserPwd = {} as UserPwd;

  currentMember: Member | undefined = undefined;

  constructor(
    public accountService: AccountService,
    public membersService: MembersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: (res) => {
        if (!res) return;
        this.membersService.getMember(res?.username).subscribe({
          next: (res) => (this.currentMember = res),
        });
      },
    });
  }

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
