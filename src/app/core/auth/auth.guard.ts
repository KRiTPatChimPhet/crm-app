import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { LiffService } from '../line/liff.service';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private _authService: AuthService,
    private _contactService: ContactService,
    private _router: Router,
    private _liffService: LiffService,
  ) {
    this._authService.reloadConfig();
    this._contactService.reloadConfig();
  }

  /**
     * Can match
     *
     * @param route
     * @param segments
     */
  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this._authService.check().pipe(
      switchMap((authen) => {
        console.log("authen -->", authen);
        if (!authen) {
          this._liffService.login();
          return of(false);
        }

        return of(true);
      }),
    );
  }

}
