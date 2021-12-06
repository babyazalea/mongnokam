import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Octokit } from '@octokit/core';
import { v4 as uuidv4 } from 'uuid';

import { Repo } from '../../components/repo-lists/repo-list/repos/repo/repo.model';
import { User } from 'src/app/shared/user/user.model';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { UserService } from 'src/app/shared/user/user.service';
import { ReposService } from 'src/app/components/repo-lists/repo-list/repos/repos.service';
import { RepoListsService } from 'src/app/components/repo-lists/repo-lists.service';

@Component({
  selector: 'app-make-up',
  templateUrl: './make-up.component.html',
  styleUrls: ['./make-up.component.css', '../../shared/styles/main.css'],
})
export class MakeUpComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = true;
  isProviderLoading: boolean = false;
  isConsumerLoading: boolean = false;
  allRepos!: Array<Repo>;
  myLists!: Array<{
    id: string;
    'list-name': string;
    createdDate: string;
    'list-repos': Array<Repo>;
  }>;
  loggedInUser!: User;
  allPageNumArray!: Array<number>;

  private pageNumCalc = (userData: User) => {
    const allReposAmount =
      userData.privateRepoAmount + userData.publicRepoAmount;
    const repoPageNum = Math.floor(allReposAmount / 30) + 1;
    let repoPageArr = [];
    for (let i = 1; i < repoPageNum + 1; i++) {
      repoPageArr.push(i);
    }

    return repoPageArr;
  };

  octokit = new Octokit();

  private isAuthSub!: Subscription;
  private myListsSub!: Subscription;
  private allReposSub!: Subscription;
  private userSub!: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private reposService: ReposService,
    private repoListsService: RepoListsService
  ) {}

  ngOnInit() {
    // load auth-status
    this.isAuthenticated = this.authService.getIsAuth();
    this.isAuthSub = this.authService
      .authStatsuListener()
      .subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
      });

    this.allRepos = this.reposService.getAllRepos();
    this.allReposSub = this.reposService
      .getAllReposUpdateListener()
      .subscribe((allReposData: any) => {
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

    // get userData
    this.loggedInUser = this.userService.getUserInLocalStorage();
    if (this.loggedInUser) {
      this.allPageNumArray = this.pageNumCalc(this.loggedInUser);
    }
    this.userSub = this.userService
      .getUserUpdateListener()
      .subscribe((userData) => {
        this.loggedInUser = userData.user;
        this.allPageNumArray = this.pageNumCalc(this.loggedInUser);
      });
  } //ngOnInit

  loadReposPageHandler(pageNum: number) {
    this.isProviderLoading = true;

    this.reposService.loadRepos(pageNum);
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
    this.isAuthSub.unsubscribe();
    this.myListsSub.unsubscribe();
    this.allReposSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
