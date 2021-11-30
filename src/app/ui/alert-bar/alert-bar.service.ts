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

  getAlertMessage() {
    return this.alertMessage;
  }

  alertMessageListener() {
    return this.alertUpdated.asObservable();
  }
}
