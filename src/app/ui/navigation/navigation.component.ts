import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  callbackUrl = 'http://localhost:4200/';

  githubClientId = 'fceafe8e8a94f6473b41';

  postBody = {
    postBody: `id_token=${this.githubClientId}&providerId=github.com`,
    requestUri: 'http://localhost:4200/',
    returnIdpCredential: true,
    returnSecureToken: true,
  };

  githubLoginBaseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${environment.FIREBASE_API_KEY}`;
  githubLoginConfig = {
    client_id: environment.GITHUB_CLIENT_KEY,
    redirect_uri: this.callbackUrl + 'github-login/callback',
    allow_signup: 'false',
    scope: 'repo' + ' ' + 'user',
  };
  githubLoginConfigUrl = new URLSearchParams(this.githubLoginConfig).toString();

  githubLoginUrl = this.githubLoginBaseUrl + this.githubLoginConfigUrl;

  constructor(public http: HttpClient) {}

  githubLoginHandler() {
    this.http.post(this.githubLoginBaseUrl, this.postBody).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  }
}
