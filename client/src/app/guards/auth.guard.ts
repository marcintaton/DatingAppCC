import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import User from 'src/types/interfaces/user';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accService = inject(AccountService);

  return accService.currentUser$.pipe(map((user: User | null) => !!user));
};
