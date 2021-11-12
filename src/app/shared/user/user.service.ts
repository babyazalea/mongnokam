import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // user variable
  private user!: { username: string; avatarUrl: string; githubUrl: string };

  constructor(private http: HttpClient) {}

  getUser(token: string) {
    this.http
      .get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => console.log(error)
      );
  }
}
