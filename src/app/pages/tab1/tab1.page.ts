import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/core/users/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<any>();

  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit() {
    if (this._userService.isFirstTimeRegister) {
      this._userService.isFirstTimeRegister = false;
      // this._router.navigate(['/profile'], {
      //   state: { firstTimeRegister: true },
      // });
    }
  }

  ionViewWillEnter(): void {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
