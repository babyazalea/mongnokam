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
          localStorage.setItem('accessToken', token);
          this.userService.getUser(token);
        }
      })
      .catch((error) => console.log(error));
  }
}
