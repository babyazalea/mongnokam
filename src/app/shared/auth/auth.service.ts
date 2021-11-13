import { Injectable } from '@angular/core';
import { signInWithPopup, GithubAuthProvider, Auth } from '@angular/fire/auth';
import { UserService } from 'src/app/shared/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(
    private auth: Auth,
    private githubAuthProvider: GithubAuthProvider,
    private userService: UserService
  ) {}

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
          localStorage.setItem('accessToken', token);
          this.userService.getUser(token);
          this.isLoggedIn = true;
        }
      })
      .catch((error) => console.log(error));
  }
}
