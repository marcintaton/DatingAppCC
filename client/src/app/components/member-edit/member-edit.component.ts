import { Component, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';
import Member from 'src/app/types/interfaces/member';
import User from 'src/app/types/interfaces/user';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) $event.returnValue = true;
  }
  member: Member | undefined = undefined;
  user: User | undefined = undefined;

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private snackBar: MatSnackBar
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => (this.user = user || undefined),
      complete: () => this.loadMember(),
    });
  }

  loadMember() {
    if (!this.user) return;

    this.memberService.getMember(this.user.username).subscribe({
      next: (member) => (this.member = member),
    });
  }

  updateMember() {
    console.log(this.member);
    this.snackBar.open('Updated successfully');
    this.editForm?.reset(this.member);
  }
}
