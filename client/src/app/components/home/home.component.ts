import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  registerMode: boolean = false;

  constructor(public accountService: AccountService) {}

  setRegisterMode(state: boolean) {
    this.registerMode = state;
  }
}
