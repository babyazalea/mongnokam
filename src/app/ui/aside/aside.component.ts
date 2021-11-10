import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RepoListsService } from 'src/app/components/repo-lists/repo-lists.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit, OnDestroy {
  detectingChangingMyList: boolean = false;
  detectingChangingAllRepos: boolean = false;
  private myListsSub: Subscription = new Subscription();
  private allReposSub: Subscription = new Subscription();

  constructor(private repoListsService: RepoListsService) {}

  ngOnInit() {
    this.myListsSub = this.repoListsService
      .getMyListsUpdateListener()
      .subscribe((listsData) => {
        this.detectingChangingMyList = listsData.detectedChangingMyLists;
      });
    this.allReposSub = this.repoListsService
      .getAllReposUpdateListener()
      .subscribe((allReposData) => {
        console.log(allReposData);
        this.detectingChangingAllRepos = allReposData.detectedChangingAllrepos;
      });
  }

  saveRecentLists() {
    const isAuth = false;

    if (!isAuth) {
      this.repoListsService.storingCurrentMakeUpLocalStorage();
      return;
    }

    this.repoListsService.storingCurrentMakeUpLocalStorage();
  }

  loggingState() {
    console.log(this.detectingChangingAllRepos);
    console.log(this.detectingChangingMyList);
    console.log(this.detectingChangingAllRepos || this.detectingChangingMyList);
  }

  ngOnDestroy() {
    this.myListsSub.unsubscribe();
    this.allReposSub.unsubscribe();
  }
}
