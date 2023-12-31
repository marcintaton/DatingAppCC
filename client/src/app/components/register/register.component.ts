import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';
import UserPwd from 'src/app/types/interfaces/userPwd';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  model: UserPwd = {} as UserPwd;

  @Output() onCancel = new EventEmitter();

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      complete: () => (this.model = {} as UserPwd),
    });
  }

  cancel() {
    this.onCancel.emit(false);
  }
}
