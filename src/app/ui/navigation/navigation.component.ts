import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { signInWithPopup, GithubAuthProvider, Auth } from '@angular/fire/auth';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(
    public auth: Auth,
    public githubAuthProvider: GithubAuthProvider,
    private userService: UserService
  ) {}

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
}
