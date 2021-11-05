import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Octokit } from '@octokit/core';
import { RepoListsService } from 'src/app/components/repo-lists/repo-lists.service';
import { v4 as uuidv4 } from 'uuid';

import { Repo } from '../../components/repo-lists/repo-list/repo/repo.model';

const dummyDatas = [
  {
    id: 'list1',
    createdDate: Date.now().toLocaleString(),
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
    createdDate: Date.now().toLocaleString(),
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
    createdDate: Date.now().toLocaleString(),
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
    createdDate: Date.now().toLocaleString(),

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

@Component({
  selector: 'app-make-up',
  templateUrl: './make-up.component.html',
  styleUrls: ['./make-up.component.css', '../../shared/styles/main.css'],
})
export class MakeUpComponent implements OnInit, OnDestroy {
  isFirstTime: boolean = false;
  isProviderLoading: boolean = false;
  isConsumerLoading: boolean = false;
  allRepos!: Array<Repo>;
  myLists!: Array<{
    id: string;
    'list-name': string;
    createdDate: string;
    'list-repos': Array<Repo>;
  }>;
  octokit = new Octokit();
  private myListsSub: Subscription = new Subscription();
  private allReposSub: Subscription = new Subscription();

  constructor(public repoListsService: RepoListsService) {}

  ngOnInit() {
    // need load all-repos conditionally from database, localStroage or firebase
    this.allRepos = this.repoListsService.getAllReposInLocalStorage();
    if (this.allRepos.length === 0) {
      this.isFirstTime = true;
    }
    this.allReposSub = this.repoListsService
      .allReposUpdatedListener()
      .subscribe((allReposData) => {
        console.log(allReposData);
        this.allRepos = allReposData.allRepos;
        this.isProviderLoading = false;
      });

    // need load my-lists conditionally from database, localStroage or firebase
    this.myLists = this.repoListsService.getMyListsInLocalStorage();
    this.myListsSub = this.repoListsService
      .getMyListsUpdateListener()
      .subscribe((listsData) => {
        this.myLists = listsData.lists;
      });
  } //ngOnInit

  async loadReposHandler() {
    this.isFirstTime = false;
    this.isProviderLoading = true;

    try {
      const response = await this.octokit.request(
        'GET /users/babyazalea/repos',
        {
          username: 'babyazalea',
          per_page: 100,
          page: 2,
        }
      );
      const responseData = await response.data;

      this.isProviderLoading = false;
      if (!responseData) {
        return;
      }

      let arr: Array<Repo> = [];
      response.data.map((responseData: any, index: string) => {
        const repository = {
          id: responseData.id,
          title: responseData.name,
          url: responseData.html_url,
          location: 'all-repos',
        };
        arr.push(repository);
      });
      // storing to localStorage
      const allRepos = JSON.stringify(arr);
      localStorage.setItem('allRepos', allRepos);
      this.allRepos = arr;
    } catch (error) {
      console.log(error);
    }
  }

  onAddMyList() {
    const newList = {
      id: uuidv4(),
      'list-name': '생성된 리스트',
      createdDate: new Date().toLocaleString(),
      'list-repos': [],
    };

    this.repoListsService.addMyList(newList);
  }

  editListName(listObj: { listId: string; listName: string }) {
    // finding editing list
    const currentLists = this.myLists;
    const editingList = this.myLists.find(
      (list) => list.id === listObj.listId
    )!;

    // storing editing list index
    const editingListIndex = this.myLists.findIndex(
      (list) => list.id === listObj.listId
    )!;

    // change list name
    editingList['list-name'] = listObj.listName;

    // replace original list to editedList
    currentLists.splice(editingListIndex, 1, editingList);

    // replace original lists to editedLists
    this.myLists = currentLists;
  }

  ngOnDestroy() {
    this.myListsSub.unsubscribe();
    this.allReposSub.unsubscribe();
  }
}
