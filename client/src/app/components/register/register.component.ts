import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';
import UserPwd from 'src/types/interfaces/userPwd';

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
      error: (error) => {
        if (error.error.errors) {
          if (error.error.errors.Username != null)
            this.snackBar.open(error.error.errors.Username[0]);
          else if (error.error.errors.Password != null)
            this.snackBar.open(error.error.errors.Password[0]);
        } else {
          this.snackBar.open(error.error);
        }
      },
      complete: () => (this.model = {} as UserPwd),
    });
  }

  cancel() {
    this.onCancel.emit(false);
  }
}
