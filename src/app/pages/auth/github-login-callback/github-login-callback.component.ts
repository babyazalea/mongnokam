import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-github-login-callback',
  templateUrl: './github-login-callback.component.html',
  styleUrls: ['./github-login-callback.component.css'],
})
export class GithubLoginCallbackComponent implements OnInit {
  isLoading: boolean = false;

  constructor(public route: ActivatedRoute, public http: HttpClient) {}

  ngOnInit(): void {
    // // this.isLoading = true;
    // // const firebaseUrl =
    // //   `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${environment.FIREBASE_API_KEY}`;
    // // this.route.queryParams.subscribe((params: Params) => {
    // //   const code = params.code;
    // //   if (code !== null) {
    // //     const config = {
    // //       code: code,
    // //       client_id: environment.GITHUB_CLIENT_KEY,
    // //       client_secret: environment.GITHUB_SECRET_KEY,
    // //     };
    // //     const configUrl = new URLSearchParams(config).toString();
    // //     const tokenReqUrl = `${firebaseUrl}?${configUrl}`;
    // //     console.log(config);
    // //     this.http.post(firebaseUrl, config).subscribe(
    // //       (response) => console.log(response),
    // //       (error) => console.log(error)
    // //     );
    // //   }
    // });
  }
}
