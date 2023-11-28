import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, map, switchMap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../config/config.service';
import { ContactService } from '../contacts/contact.service';
import { UpsertContactByLineDto } from '../contacts/dto/upsert-contact-line.dto';
import { LiffService } from '../line/liff.service';
import { MessageService } from '../message/message.service';
import { ServiceName } from '../message/service-message.const';
import { UserService } from '../users/user.service';
import { User } from '../users/user.types';
import { AuthUtils } from './auth.utils';
import { LiffTokenDto } from './dto/liff-token.dto';
import { TokenDto } from './dto/token.dto';
import { Response } from '../base/response.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _apiUrl = this._configService.getConfigByKey('apiUrl') || '';
  baseAuthUrl = `${this._apiUrl}/api/auth/v2/auth`;

  apiUrl = {
    lineVerifyUrl: `${this.baseAuthUrl}/liff/token`,
  };

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _configService: ConfigService,
    private _userService: UserService,
    private _liffService: LiffService,
    private _contactService: ContactService,
    private _messageService: MessageService
  ) {}

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    sessionStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return sessionStorage.getItem('accessToken') ?? '';
  }

  reloadConfig(): void {
    this._configService.loadConfig();
    this._apiUrl = this._configService.getConfigByKey('apiUrl') || '';
    this.baseAuthUrl = `${this._apiUrl}/api/auth/v2/auth`;
    this.apiUrl.lineVerifyUrl = `${this.baseAuthUrl}/liff/token`;
  }

  check(): Observable<boolean> {
    // REMARK: --- For dev only ---
    if (!environment.production) {
      this.accessToken = environment.accessTokenTest;
      this._userService.activeUser = environment.userTest;
      console.log('Dev environment');
      return of(true);
    }
    // ----------------------------

    // console.log("accessToken -->", this.accessToken);
    // console.log("token Expire", AuthUtils.isTokenExpired(this.accessToken));
    // console.log('active user -->', this._userService.hasActiveUser);
    // Has valid access token and active use
    if (
      this.accessToken &&
      !AuthUtils.isTokenExpired(this.accessToken) &&
      this._userService.hasActiveUser
    ) {
      return of(true);
    }

    if (this._liffService.isLoggedIn()) {
      return this.signInUsingLiffToken();
    }

    return of(false);
  }

  lineVerifyToken(dto: LiffTokenDto): Observable<Response<TokenDto>> {
    return this._httpClient.post<Response<TokenDto>>(
      this.apiUrl.lineVerifyUrl,
      dto
    );
  }

  signInUsingLiffToken(): Observable<any> {
    // console.log(this._apiUrl);

    const appName = this._configService.getConfigByKey('appName') || '';

    const dto = {
      appName: appName,
      idToken: this._liffService.getIDToken(),
    };

    return forkJoin({
      token: this.lineVerifyToken(dto).pipe(map((res) => res.data)),
      profile: this._liffService.getProfile(),
    }).pipe(
      switchMap((info) => {
        this.accessToken = info.token.accessToken;

        const payload: UpsertContactByLineDto = {
          luid: info.profile.userId,
          email: info.profile.email,
          imageProfile: info.profile.pictureUrl,
          lineName: info.profile.displayName,
        };

        return forkJoin({
          contact: this._contactService
            .upsertContactByLine(payload)
            .pipe(map((res) => res.data)),
          profile: of(info.profile),
        });
      }),
      switchMap((res) => {
        const user: User = {
          contact: res.contact,
          lineProfile: res.profile,
        };
        console.log(user);
        this._userService.activeUser = user;
        return of(true);
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }

  private _handleError(error: HttpErrorResponse | Error): Error {
    // console.log(error);
    if (error instanceof Error) {
      return error;
    } else if (error instanceof HttpErrorResponse) {
      let message = this._messageService.getUnknownMessage();
      if (error.status !== 0) {
        if (typeof error.error === 'string') {
          message = error.statusText;
        } else {
          message = this._messageService.getErrorMessage(
            ServiceName.auth,
            error.error.code
          );
        }
      }
      return new Error(message);
    }
    return error;
  }
}
