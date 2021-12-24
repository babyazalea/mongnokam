import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/auth/auth.service';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userName!: string;

  private authStatusSub!: Subscription;
  private userSub!: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // load auth status
    this.isAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .authStatusListener()
      .subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
      });

    // load user name
    const userInfoInLocalStorage = localStorage.getItem('userData');
    if (userInfoInLocalStorage) {
      const username = JSON.parse(userInfoInLocalStorage).username;
      this.userName = username;
      return;
    }
    this.userSub = this.userService
      .getUserUpdateListener()
      .subscribe((userData) => (this.userName = userData.user.username));
  }

  githubLoginHandler() {
    this.authService.githubLogin();
  }

  logoutHandler() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
