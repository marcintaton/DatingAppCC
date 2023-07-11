import { Component, EventEmitter, Output } from '@angular/core';
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

  constructor(private accountService: AccountService) {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: (error) => console.log(error),
      complete: () => (this.model = {} as UserPwd),
    });
  }

  cancel() {
    this.onCancel.emit(false);
  }
}
