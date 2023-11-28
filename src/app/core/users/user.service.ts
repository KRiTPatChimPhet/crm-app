import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.types';
import { Contact } from '../contacts/contact.types';
import { LineProfile } from '../line/line-profile.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user?: User;
  private _firstTimeRegister: boolean = true;

  constructor(private _httpClient: HttpClient) {
  }

  get isFirstTimeRegister(): boolean {
    // REMARK : if you want to every time to open shop , you must register
    // you can this, only return _firstTimeRegister, don't check

    // First time register check from contact lastname equal line user id
    // because when first login , i will insert contact by use
    // firstname is line displayName
    // lastname is userId
    const contact = this._user?.contact;
    const lineProfile = this._user?.lineProfile;

    this._firstTimeRegister = false;
    if (!contact?.firstName || !contact?.lastName) {
      this._firstTimeRegister = true;
    }

    // Last name equal user Id
    if (contact?.lastName === lineProfile?.userId) {
      this._firstTimeRegister = true;
    }

    return this._firstTimeRegister;
  }

  set isFirstTimeRegister(value: boolean) {
    this._firstTimeRegister = value;
  }

  get activeUser(): User | undefined {
    return this._user;
  }

  get contactId(): string | undefined {
    return this._user?.contact?._id;
  }

  get contactName(): string | undefined {
    if (this._user?.contact) {
      const contact = this._user?.contact;
      return `${contact.title || 'คุณ'}` + ' ' +
       `${contact.firstName || ''}` + ' ' +
        `${contact.lastName || ''}`;
    }
    return undefined;
  }

  get contactTags(): string[] | undefined {
    return this._user?.contact?.tags;
  }

  get contact(): Contact | undefined {
    return this._user?.contact;
  }

  set contact(value: Contact | undefined) {
    if (this._user) {
      this._user.contact = value;
    }
  }

  get lineProfile(): LineProfile | undefined {
    return this._user?.lineProfile;
  }

  set activeUser(value: User | undefined) {
    this._user = value;
  }

  get hasActiveUser(): boolean {
    return !!this._user;
  }
}
