import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from 'src/app/shared/user/user.model';
import { UserService } from 'src/app/shared/user/user.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  user!: User;
  private userSub: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // load user info
    this.userSub = this.userService.getUserUpdated().subscribe((userData) => {
      this.user = userData.user;
    });
  }

  githubLoginHandler() {
    this.authService.githubLogin();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
