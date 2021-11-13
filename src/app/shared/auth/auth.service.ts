import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { signInWithPopup, GithubAuthProvider, Auth } from '@angular/fire/auth';
import { UserService } from 'src/app/shared/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private authTimer!: NodeJS.Timer;

  constructor(
    private auth: Auth,
    private githubAuthProvider: GithubAuthProvider,
    private userService: UserService
  ) {}

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatus() {
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
          this.userService.getUser(token);
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
    const remainingTime = expiresInDate.getTime() - now.getTime();
    if (remainingTime > 0) {
      console.log(remainingTime);
      this.isAuthenticated = true;
      this.setAuthTimer(remainingTime);
    }
    console.log(this.setAuthTimer);
  }

  private setAuthTimer(duration: number) {
    this.authTimer = setTimeout(() => {
      // need logout
      console.log('logout');
    }, duration);
  }
}
