import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/auth/auth.service';
import { AlertBarService } from './ui/alert-bar/alert-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mongnokam';

  // alert state
  isAlert: boolean = false;
  alertMessage!: string;
  alertSub!: Subscription;

  constructor(
    private authService: AuthService,
    private alertBarService: AlertBarService
  ) {}

  ngOnInit() {
    this.authService.autoAuth();
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

  clearAlert() {
    this.isAlert = false;
    this.alertBarService.clearAlert();
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }
}
