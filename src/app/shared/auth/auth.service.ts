import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private authTimer!: NodeJS.Timer;

  constructor(
    private auth: Auth,
    private githubAuthProvider: GithubAuthProvider,
    private userService: UserService
  ) {}

  getIsAuth() {
    return this.isAuthenticated;
  }

  authStatsuListener() {
    return this.authStatusListener.asObservable();
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
          console.log('got token');
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const expiresDuration = Date.now() + 3600000;
          const authenticatedUserData = {
            token,
            expiresIn: new Date(expiresDuration),
          };
          localStorage.setItem(
            'authData',
            JSON.stringify(authenticatedUserData)
          );
          this.setAuthTimer(expiresDuration);
          this.userService.loadUserInfoFromGithub(token);
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
      this.authStatusListener.next(true);
      this.setAuthTimer(remainingDuration);
    }
  }

  logout() {
    signOut(this.auth)
      .then((res) => {
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.authTimer);
        localStorage.removeItem('userData');
        localStorage.removeItem('authData');
      })
      .catch((error) => error);
  }

  private setAuthTimer(duration: number) {
    this.authTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
}
