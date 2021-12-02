import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  state,
  style,
  trigger,
  transition,
  animate,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { AlertBarService } from './alert-bar.service';

@Component({
  selector: 'app-alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.css'],
  animations: [
    trigger('showHide', [
      state(
        '*',
        style({
          transform: 'translateY(-100%)',
        })
      ),
      state(
        'show',
        style({
          transform: 'translateY(0)',
        })
      ),
      state(
        'hide',
        style({
          transform: 'translateY(-100%)',
        })
      ),
      transition('* => *', [animate('0.2s')]),
    ]),
  ],
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
        if (alertData.message !== '') {
          this.isAlert = true;
        }
        this.alertMessage = alertData.message;
      });
  }

  clearAlertHandler() {
    this.alertBarService.clearAlert();
    this.isAlert = false;
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }
}
