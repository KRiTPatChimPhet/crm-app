import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private _injector: Injector,
    private _zone: NgZone,
    private alertController: AlertController
  ) {}

  handleError(error: any | Error | HttpErrorResponse) {
    let message: string;
    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = this.getServerMessage(error);
    } else {
      // Client Error
      message = this.getClientMessage(error);
    }

    // Show error to snackbar
    this._zone.run(() => {
      this.presentAlert(message);
    });
  }

  getClientMessage(error: Error): string {
    // console.log('client message');
    console.log(error);
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }

    let msg = 'เกิดข้อผิดพลาด กรุณาติดต่อแอดมิน \r\n'
    if (error instanceof Error) {

      msg += error.message ? error.message : error.toString();
    } else {
      msg += error;
    }

    return msg;
  }

  getServerMessage(error: HttpErrorResponse): string {
    return typeof error.error !== 'string'
      ? error.error.message
      : error.message;
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      message: message,
      cssClass: 'pre-line',
      buttons: ['ยืนยัน'],
    });

    await alert.present();
  }
}
