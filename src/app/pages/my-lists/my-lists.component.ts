import { Component, OnInit } from '@angular/core';
import { Repo } from 'src/app/components/repo-list/repo/repo.model';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css', '../../shared/styles/main.css'],
})
export class MyListsComponent implements OnInit {
  myFavoriteLists: Array<{
    id: string;
    'list-name': string;
    'list-repos': Array<Repo>;
  }> = [];
  myLists: Array<{
    id: string;
    'list-name': string;
    'list-repos': Array<Repo>;
  }> = [];

  ngOnInit() {
    this.myFavoriteLists = [
      {
        id: 'list1',
        'list-name': 'react',
        'list-repos': [
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
  }
}
