import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const toastr = inject(ToastrService);
  const accService = inject(AccountService);

  if (accService.currentUser$ != null) return true;

  return false;
};
