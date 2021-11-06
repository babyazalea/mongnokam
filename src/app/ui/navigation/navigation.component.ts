import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  githubLoginConfig = {
    client_id: environment.githubApiKey,
    allow_signup: 'false',
    scope: 'repo' + ' ' + 'user',
  };

  githubLoginConfigUrl = new URLSearchParams(this.githubLoginConfig).toString();

  githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${environment.githubApiKey}&allow_signup=false&scope=user%20repo`;
}
