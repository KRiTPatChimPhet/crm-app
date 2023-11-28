import { inject } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn,
} from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { UserService } from './core/users/user.service';

export const initialDataResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  const contactId = userService.contactId;
  console.log('contact id --> ', contactId);
  if (contactId) {
    return forkJoin({});
  }
  return of({});
};
