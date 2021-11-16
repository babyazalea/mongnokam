import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RepoService } from 'src/app/components/repo-lists/repo-list/repo/repo.service';

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

  constructor(
    private repoService: RepoService,
    private repoListsService: RepoListsService
  ) {}

  ngOnInit() {
    this.myListsSub = this.repoListsService
      .getMyListsUpdateListener()
      .subscribe((listsData) => {
        this.detectingChangingMyList = listsData.detectedChangingMyLists;
      });
    this.allReposSub = this.repoService
      .getAllReposUpdateListener()
      .subscribe((allReposData) => {
        this.detectingChangingAllRepos = allReposData.detectedChangingAllrepos;
      });
  }

  saveRecentLists() {
    this.repoService.storingCurrentAllRepos();
    this.repoListsService.storingCurrentMyLists();
  }

  ngOnDestroy() {
    this.myListsSub.unsubscribe();
    this.allReposSub.unsubscribe();
  }
}
