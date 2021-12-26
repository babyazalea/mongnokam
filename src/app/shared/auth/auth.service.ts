import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import {
  Auth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from '@angular/fire/auth';
import { UserService } from 'src/app/shared/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private authStatusUpdated = new BehaviorSubject<boolean>(false);
  private authTimer!: NodeJS.Timer;

  constructor(
    private auth: Auth,
    private githubAuthProvider: GithubAuthProvider,
    private userService: UserService,
    private router: Router
  ) {}

  getIsAuth() {
    return this.isAuthenticated;
  }

  authStatusListener() {
    return this.authStatusUpdated.asObservable();
  }

  githubLogin() {
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
          const expiresDuration = Date.now() + 3600000;
          const authenticatedUserData = {
            token,
            expiresIn: new Date(expiresDuration),
          };
          const jsonAuthData = JSON.stringify(authenticatedUserData);
          localStorage.setItem('authData', jsonAuthData);
          this.setAuthTimer(3600000);
          this.userService.loadUserInfoFromGithub(token).add(() => {
            this.isAuthenticated = true;
            this.authStatusUpdated.next(true);
          });
        }
      })
      .catch((error) => console.log(error));
  }

  autoAuth() {
    const authData = localStorage.getItem('authData');
    if (!authData) {
      return;
    }

    const parsedAuthData = JSON.parse(authData);
    const expiresInDate = new Date(parsedAuthData.expiresIn);
    const now = new Date();
    const remainingDuration = expiresInDate.getTime() - now.getTime();
    if (remainingDuration > 0) {
      this.isAuthenticated = true;
      this.authStatusUpdated.next(true);
      this.setAuthTimer(remainingDuration);
    }
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        this.isAuthenticated = false;
        this.authStatusUpdated.next(false);
        clearTimeout(this.authTimer);
        localStorage.removeItem('userData');
        localStorage.removeItem('authData');
        this.router.navigate(['/']).finally(() => {});
      })
      .catch((error) => error);
  }

  private setAuthTimer(duration: number) {
    this.authTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
}
