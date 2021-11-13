import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private authStatusSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // load auth status
    this.isAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatus()
      .subscribe((isAuth) => (this.isAuthenticated = isAuth));
  }

  githubLoginHandler() {
    this.authService.githubLogin();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
