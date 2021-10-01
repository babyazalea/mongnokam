import { Component, OnInit } from '@angular/core';

import { Octokit } from '@octokit/core';

import { Repo } from '../../components/repo-list/repo/repo.model';

@Component({
  selector: 'app-make-up',
  templateUrl: './make-up.component.html',
  styleUrls: ['./make-up.component.css'],
})
export class MakeUpComponent implements OnInit {
  location = 'make-up';
  octokit = new Octokit();
  allRepos: Array<Repo> = [];

  ngOnInit() {
    this.octokit
      .request('GET /users/babyazalea/repos', {
        username: 'babyazalea',
        per_page: 100,
      })
      .then((response) => {
        let arr: Array<Repo> = [];
        response.data.map((responseData: any, index: string) => {
          const repository = {
            id: index,
            title: responseData.name,
            url: responseData.html_url,
            location: this.location,
          };
          arr.push(repository);
        });
        this.allRepos = arr;
      });
  }
}
