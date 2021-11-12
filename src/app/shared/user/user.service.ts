import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // user variable
  private user!: {
    username: string;
    avatarUrl: string;
    githubUrl: string;
    publicRepoAmount: number;
    privateRepoAmount: number;
  };
  private userUpdated = new Subject<{
    user: {
      username: string;
      avatarUrl: string;
      githubUrl: string;
      publicRepoAmount: number;
      privateRepoAmount: number;
    };
  }>();

  constructor(private http: HttpClient) {}

  getUser(token: string) {
    this.http
      .get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: any) => {
          if (response.login) {
            const loggedInUser = {
              username: response.login,
              avatarUrl: response['avatar_url'],
              githubUrl: response['html_url'],
              publicRepoAmount: response['public_repos'],
              privateRepoAmount: response['owned_private_repos'],
            };
            this.user = loggedInUser;
            this.userUpdated.next({
              user: this.user,
            });
          }
        },
        (error) => console.log(error)
      );
  }
}
