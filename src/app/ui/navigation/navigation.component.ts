import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { signInWithPopup, GithubAuthProvider, Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(
    public auth: Auth,
    public githubAuthProvider: GithubAuthProvider,
    public http: HttpClient
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

          this.http
            .get('https://api.github.com/user', {
              headers: {
                Authorization: `token ${token}`,
              },
            })
            .subscribe(
              (response: any) => {
                const res = response;
                console.log(res['public_repos']);
                console.log(res['total_private_repos']);
              },
              (error) => console.log(error)
            );
        }
      })
      .catch((error) => console.log(error));
  }
}
