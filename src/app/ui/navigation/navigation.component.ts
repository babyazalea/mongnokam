import { Component, OnDestroy, OnInit } from '@angular/core';

import { signInWithPopup, GithubAuthProvider, Auth } from '@angular/fire/auth';
import { UserService } from 'src/app/shared/user/user.service';
import { User } from 'src/app/shared/user/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  user!: User;
  private userSub: Subscription = new Subscription();

  constructor(
    public auth: Auth,
    public githubAuthProvider: GithubAuthProvider,
    private userService: UserService
  ) {}

  ngOnInit() {
    // load user info
    this.userSub = this.userService.getUserUpdated().subscribe((userData) => {
      this.user = userData.user;
    });
  }

  githubLoginHandler() {
    const ghProvider = this.githubAuthProvider;

    ghProvider.addScope('repo user');
    ghProvider.setCustomParameters({
      allow_signup: 'false',
    });

    signInWithPopup(this.auth, ghProvider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        if (token) {
          localStorage.setItem('accessToken', token);
          this.userService.getUser(token);
        }
      })
      .catch((error) => console.log(error));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
