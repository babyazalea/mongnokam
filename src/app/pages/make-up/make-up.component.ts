import { Component, OnInit } from '@angular/core';

import { Octokit } from '@octokit/core';
import { v4 as uuidv4 } from 'uuid';

import { Repo } from '../../components/repo-list/repo/repo.model';

@Component({
  selector: 'app-make-up',
  templateUrl: './make-up.component.html',
  styleUrls: ['./make-up.component.css', '../../shared/styles/main.css'],
})
export class MakeUpComponent implements OnInit {
  isFirstTime: boolean = true;
  isLoading: boolean = false;
  allRepos: Array<Repo> = [];
  myLists: Array<{
    id: string;
    'list-name': string;
    'list-repos': Array<Repo>;
  }> = [];
  octokit = new Octokit();

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
    // this.allRepos = [
    //   {
    //     id: '1',
    //     title: 'test-all-repos1',
    //     url: 'https://www.google.com/',
    //     location: 'all-repos',
    //   },
    //   {
    //     id: '2',
    //     title: 'test-all-repos2',
    //     url: 'https://www.google.com/',
    //     location: 'all-repos',
    //   },
    //   {
    //     id: '3',
    //     title: 'test-all-repos3',
    //     url: 'https://www.google.com/',
    //     location: 'all-repos',
    //   },
    //   {
    //     id: '4',
    //     title: 'test-all-repos4',
    //     url: 'https://www.google.com/',
    //     location: 'all-repos',
    //   },
    //   {
    //     id: '5',
    //     title: 'test-all-repos5',
    //     url: 'https://www.google.com/',
    //     location: 'all-repos',
    //   },
    //   {
    //     id: '6',
    //     title: 'test-all-repos6',
    //     url: 'https://www.google.com/',
    //     location: 'all-repos',
    //   },
    //   {
    //     id: '7',
    //     title: 'test-all-repos7',
    //     url: 'https://www.google.com/',
    //     location: 'all-repos',
    //   },
    //   {
    //     id: '8',
    //     title: 'test-all-repos8',
    //     url: 'https://www.google.com/',
    //     location: 'all-repos',
    //   },
    //   {
    //     id: '9',
    //     title: 'test-all-repos9',
    //     url: 'https://www.google.com/',
    //     location: 'all-repos',
    //   },
    //   {
    //     id: '10',
    //     title: 'test-all-repos10',
    //     url: 'https://www.google.com/',
    //     location: 'all-repos',
    //   },
    // ];

    this.myLists = [
      {
        id: 'list1',
        'list-name': 'react',
        'list-repos': [
          {
            id: '10',
            title: 'test-my-repos11',
            url: 'https://www.google.com/',
            location: 'list0',
          },
          {
            id: '11',
            title: 'test-my-repos11',
            url: 'https://www.google.com/',
            location: 'list1',
          },
          {
            id: '12',
            title: 'test-my-repos12',
            url: 'https://www.google.com/',
            location: 'list1',
          },
          {
            id: '13',
            title: 'test-my-repos13',
            url: 'https://www.google.com/',
            location: 'list1',
          },
          {
            id: '14',
            title: 'test-my-repos14',
            url: 'https://www.google.com/',
            location: 'list1',
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
            location: 'list2',
          },
          {
            id: '16',
            title: 'test-my-repos16',
            url: 'https://www.google.com/',
            location: 'list2',
          },
          {
            id: '17',
            title: 'test-my-repos17',
            url: 'https://www.google.com/',
            location: 'list2',
          },
          {
            id: '18',
            title: 'test-my-repos18',
            url: 'https://www.google.com/',
            location: 'list2',
          },
          {
            id: '19',
            title: 'test-my-repos19',
            url: 'https://www.google.com/',
            location: 'list2',
          },
          {
            id: '20',
            title: 'test-my-repos20',
            url: 'https://www.google.com/',
            location: 'list2',
          },
        ],
      },
      {
        id: 'list3',
        'list-name': 'vue',
        'list-repos': [
          {
            id: '21',
            title: 'test-my-repos21',
            url: 'https://www.google.com/',
            location: 'list3',
          },
          {
            id: '22',
            title: 'test-my-repos22',
            url: 'https://www.google.com/',
            location: 'list3',
          },
          {
            id: '23',
            title: 'test-my-repos23',
            url: 'https://www.google.com/',
            location: 'list3',
          },
          {
            id: '24',
            title: 'test-my-repos24',
            url: 'https://www.google.com/',
            location: 'list3',
          },
          {
            id: '25',
            title: 'test-my-repos25',
            url: 'https://www.google.com/',
            location: 'list3',
          },
        ],
      },
      {
        id: 'list4',
        'list-name': 'spring boot',
        'list-repos': [
          {
            id: '26',
            title: 'test-my-repos26',
            url: 'https://www.google.com/',
            location: 'list4',
          },
          {
            id: '27',
            title: 'test-my-repos27',
            url: 'https://www.google.com/',
            location: 'list4',
          },
          {
            id: '28',
            title: 'test-my-repos28',
            url: 'https://www.google.com/',
            location: 'list4',
          },
          {
            id: '29',
            title: 'test-my-repos29',
            url: 'https://www.google.com/',
            location: 'list4',
          },
          {
            id: '30',
            title: 'test-my-repos30',
            url: 'https://www.google.com/',
            location: 'list4',
          },
        ],
      },
    ];
  } //ngOnInit

  async loadReposHandler() {
    this.isFirstTime = false;
    this.isLoading = true;

    try {
      const response = await this.octokit.request(
        'GET /users/babyazalea/repos',
        {
          username: 'babyazalea',
          per_page: 100,
        }
      );
      const responseData = await response.data;

      this.isLoading = false;
      if (!responseData) {
        return;
      }

      let arr: Array<Repo> = [];
      response.data.map((responseData: any, index: string) => {
        const repository = {
          id: index,
          title: responseData.name,
          url: responseData.html_url,
          location: 'all-repos',
        };
        arr.push(repository);
      });
      this.allRepos = arr;
    } catch (error) {
      console.log(error);
    }
  }

  addMyList() {
    const newList = {
      id: uuidv4(),
      'list-name': '생성된 리스트',
      'list-repos': [],
    };

    this.myLists.splice(0, 0, newList);
  }
}
