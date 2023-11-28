import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

declare let liff: any;

@Injectable({
  providedIn: 'root'
})
export class LiffService {

  constructor() { }

  init(liffId: string): Observable<any> {
    return from(liff.init({ liffId }));
  }

  login(): Observable<any> {
    return from(liff.login());
  }

  logout() {
    return liff.logout();
  }

  isLoggedIn(): boolean {
    return liff.isLoggedIn();
  }

  getProfile(): Observable<any> {
    return from(liff.getProfile());
  }

  getIDToken(): string {
    return liff.getIDToken();
  }

  getAccessToken(): string {
    return liff.getAccessToken();
  }
  getDecodedIDToken(): any {
    return liff.getDecodedIDToken();
  }

  
}
