import { Injectable } from '@angular/core';
import { SERVICE_ERROR_MESSAGE, ServiceName } from './service-message.const';
import { COMMON_UNKNOWN_MSG } from './const/common.const';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  // getSucceededMessage(successCode: string): string {
  //   return SUCCEEDED_MSG[successCode] || 'Succeeded';
  // }

  // getConfirmMessage(confirmCode: string): string {
  //   return CONFIRM_MSG[confirmCode] || 'Confirm';
  // }

  getUnknownMessage(): string {
    return COMMON_UNKNOWN_MSG;
  }

  getErrorMessage(serviceName: ServiceName, errorCode: string): string {

    if (serviceName in SERVICE_ERROR_MESSAGE) {
      const serviceErrorMsg = SERVICE_ERROR_MESSAGE[serviceName] as any;
      if (errorCode in serviceErrorMsg) {
        return `ERROR: ${errorCode} \r\n${serviceErrorMsg[errorCode]}`;
      }
    }

    return COMMON_UNKNOWN_MSG;
  }

  // getCancelMessage(confirmCode: string): string {
  //   return CANCEL_MSG[confirmCode] || 'Cancel';
  // }
}
