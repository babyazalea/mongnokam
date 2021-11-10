import { Component } from '@angular/core';

import { signInWithPopup, GithubAuthProvider, Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(
    public auth: Auth,
    public githubAuthProvider: GithubAuthProvider
  ) {}

  githubLoginHandler() {
    signInWithPopup(this.auth, this.githubAuthProvider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
      })
      .catch((error) => console.log(error));
  }
}
