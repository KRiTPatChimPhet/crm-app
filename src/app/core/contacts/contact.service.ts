import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { UpsertContactByLineDto } from './dto/upsert-contact-line.dto';
import { Contact } from './contact.types';
import { Response } from '../base/response.types';
import { ServiceName } from '../message/service-message.const';
import { MessageService } from '../message/message.service';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  _apiUrl = this._configService.getConfigByKey('apiUrl') || '';
  baseContactUrl = `${this._apiUrl}/api/contacts/v2/contacts`;

  apiUrl = {
    contactUrl: this.baseContactUrl,
    getMeUrl: `${this.baseContactUrl}/line/me`,
    upsertContactByLineUrl: `${this.baseContactUrl}/line/user`,
  };

  constructor(
    private _httpClient: HttpClient,
    private _configService: ConfigService,
    private _messageService: MessageService,
  ) {
  }

  reloadConfig(): void {
    this._configService.loadConfig();
    this._apiUrl = this._configService.getConfigByKey('apiUrl') || '';
    this.baseContactUrl = `${this._apiUrl}/api/contacts/v2/contacts`;
    this.apiUrl.contactUrl =  this.baseContactUrl;
    this.apiUrl.upsertContactByLineUrl = `${this.baseContactUrl}/line/user`;
  }

  upsertContactByLine(payload: UpsertContactByLineDto): Observable<Response<Contact>> {
    return this._httpClient
      .post<Response<Contact>>(this.apiUrl.upsertContactByLineUrl, payload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw this._handleError(error);
        })
      );
  }

  getMe(): Observable<Response<Contact>> {
    return this._httpClient
      .get<Response<Contact>>(this.apiUrl.getMeUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw this._handleError(error);
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
         message = this._messageService.getErrorMessage(ServiceName.contact, error.error.code);
       }
     }
     return new Error(message);
   }
   return error;
 }
}
