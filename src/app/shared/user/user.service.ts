import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // user variable
  private user!: User;
  private userUpdated = new Subject<{
    user: User;
  }>();

  constructor(private http: HttpClient) {}

  loadUserInfoFromGithub(token: string) {
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
            const loggedInUser: User = {
              username: response.login,
              avatarUrl: response['avatar_url'],
              githubUrl: response['html_url'],
              publicRepoAmount: response['public_repos'],
              privateRepoAmount: response['owned_private_repos'],
            };
            localStorage.setItem('userData', JSON.stringify(loggedInUser));
            this.user = loggedInUser;
            this.userUpdated.next({
              user: this.user,
            });
          }
        },
        (error) => console.log(error)
      );
  }

  getUser() {
    return this.user;
  }

  getUserInLocalStorage() {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      const user = JSON.parse(userData);
      this.user = user;
    }

    return this.user;
  }

  getUserUpdated() {
    return this.userUpdated.asObservable();
  }
}
