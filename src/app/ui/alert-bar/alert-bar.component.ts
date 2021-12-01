import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertBarService } from './alert-bar.service';

@Component({
  selector: 'app-alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.css'],
})
export class AlertBarComponent implements OnInit, OnDestroy {
  isAlert: boolean = false;
  alertMessage!: string;
  alertSub!: Subscription;

  constructor(private alertBarService: AlertBarService) {}

  ngOnInit() {
    this.alertMessage = this.alertBarService.getAlert();
    this.alertSub = this.alertBarService
      .alertMessageListener()
      .subscribe((alertData) => {
        if (alertData.message) {
          this.isAlert = true;
          this.alertMessage = alertData.message;
        }
      });
  }

  clearAlertHandler() {
    this.isAlert = false;
    this.alertBarService.clearAlert();
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }
}
