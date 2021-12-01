import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertBarService {
  alertMessage: string = '';
  alertUpdated = new Subject<{
    message: string;
  }>();

  getAlert() {
    return this.alertMessage;
  }

  setAlert(newAlertMessage: string) {
    this.alertMessage = newAlertMessage;
    this.alertUpdated.next({
      message: this.alertMessage,
    });
  }

  alertMessageListener() {
    return this.alertUpdated.asObservable();
  }
}
