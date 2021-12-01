import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertBarService {
  // isAlert: boolean = false;
  alertMessage: string = '';
  alertUpdated = new Subject<{
    // isAlert: boolean;
    message: string;
  }>();

  getAlert() {
    return this.alertMessage;
  }

  setAlert(newAlertMessage: string) {
    // this.isAlert = true;
    this.alertMessage = newAlertMessage;
    this.alertUpdated.next({
      // isAlert: this.isAlert,
      message: this.alertMessage,
    });
  }

  clearAlert() {
    // this.isAlert = false;
    this.alertMessage = '';
    this.alertUpdated.next({
      // isAlert: this.isAlert,
      message: this.alertMessage,
    });
  }

  alertMessageListener() {
    return this.alertUpdated.asObservable();
  }
}
