import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthUtils } from './auth.utils';
import { LiffService } from '../line/liff.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _liffService: LiffService,
  ) {}

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request object
    let newReq = req.clone();

    // Request
    //
    // If the access token didn't expire, add the Authorization header.
    // We won't add the Authorization header if the access token expired.
    // This will force the server to return a "401 Unauthorized" response
    // for the protected API routes which our response interceptor will
    // catch and delete the access token from the local storage while logging
    // the user out from the app.
    if (this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken)) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken)
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError((error) => {

        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {

          // Sign out
          this._liffService.logout();
          this._liffService.login();
        }

        return throwError(error);
      })
    );
  }
}
