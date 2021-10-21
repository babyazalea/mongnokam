import { Component, OnInit } from '@angular/core';

import { Octokit } from '@octokit/core';

import { Repo } from '../../components/repo-list/repo/repo.model';

@Component({
  selector: 'app-make-up',
  templateUrl: './make-up.component.html',
  styleUrls: ['./make-up.component.css'],
})
export class MakeUpComponent implements OnInit {
  locationName = {
    plate: 'loaded-repos',
    'list-container': 'my-list',
  };
  octokit = new Octokit();
  allRepos: Array<Repo> = [];
  myLists: Array<{
    id: string;
    'list-name': string;
    'list-repos': Array<Repo>;
  }> = [];

  ngOnInit() {
    // this.octokit
    //   .request('GET /users/babyazalea/repos', {
    //     username: 'babyazalea',
    //     per_page: 100,
    //   })
    //   .then((response) => {
    //     let arr: Array<Repo> = [];
    //     response.data.map((responseData: any, index: string) => {
    //       const repository = {
    //         id: index,
    //         title: responseData.name,
    //         url: responseData.html_url,
    //         location: this.locationName.plate,
    //       };
    //       arr.push(repository);
    //     });
    //     this.allRepos = arr;
    //   });
    this.allRepos = [
      {
        id: '1',
        title: 'test-all-repos1',
        url: 'https://www.google.com/',
        location: this.locationName.plate,
      },
      {
        id: '2',
        title: 'test-all-repos2',
        url: 'https://www.google.com/',
        location: this.locationName.plate,
      },
      {
        id: '3',
        title: 'test-all-repos3',
        url: 'https://www.google.com/',
        location: this.locationName.plate,
      },
      {
        id: '4',
        title: 'test-all-repos4',
        url: 'https://www.google.com/',
        location: this.locationName.plate,
      },
      {
        id: '5',
        title: 'test-all-repos5',
        url: 'https://www.google.com/',
        location: this.locationName.plate,
      },
      {
        id: '6',
        title: 'test-all-repos6',
        url: 'https://www.google.com/',
        location: this.locationName.plate,
      },
      {
        id: '7',
        title: 'test-all-repos7',
        url: 'https://www.google.com/',
        location: this.locationName.plate,
      },
      {
        id: '8',
        title: 'test-all-repos8',
        url: 'https://www.google.com/',
        location: this.locationName.plate,
      },
      {
        id: '9',
        title: 'test-all-repos9',
        url: 'https://www.google.com/',
        location: this.locationName.plate,
      },
      {
        id: '10',
        title: 'test-all-repos10',
        url: 'https://www.google.com/',
        location: this.locationName.plate,
      },
    ];

    this.myLists = [
      {
        id: 'list1',
        'list-name': 'react',
        'list-repos': [
          {
            id: '11',
            title: 'test-my-repos11',
            url: 'https://www.google.com/',
            location: this.locationName.plate,
          },
          {
            id: '12',
            title: 'test-my-repos12',
            url: 'https://www.google.com/',
            location: this.locationName.plate,
          },
          {
            id: '13',
            title: 'test-my-repos13',
            url: 'https://www.google.com/',
            location: this.locationName.plate,
          },
          {
            id: '14',
            title: 'test-my-repos14',
            url: 'https://www.google.com/',
            location: this.locationName.plate,
          },
        ],
      },
      {
        id: 'list2',
        'list-name': 'angular',
        'list-repos': [
          {
            id: '15',
            title: 'test-my-repos15',
            url: 'https://www.google.com/',
            location: this.locationName.plate,
          },
          {
            id: '16',
            title: 'test-my-repos16',
            url: 'https://www.google.com/',
            location: this.locationName.plate,
          },
          {
            id: '17',
            title: 'test-my-repos17',
            url: 'https://www.google.com/',
            location: this.locationName.plate,
          },
          {
            id: '18',
            title: 'test-my-repos18',
            url: 'https://www.google.com/',
            location: this.locationName.plate,
          },
          {
            id: '19',
            title: 'test-my-repos19',
            url: 'https://www.google.com/',
            location: this.locationName.plate,
          },
          {
            id: '20',
            title: 'test-my-repos20',
            url: 'https://www.google.com/',
            location: this.locationName.plate,
          },
        ],
      },
    ];
  }
}
