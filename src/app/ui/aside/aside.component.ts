import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReposService } from 'src/app/components/repo-lists/repo-list/repos/repos.service';

import { RepoListsService } from 'src/app/components/repo-lists/repo-lists.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit, OnDestroy {
  detectingChangingMyList: boolean = false;
  private myListsSub: Subscription = new Subscription();

  constructor(private repoListsService: RepoListsService) {}

  ngOnInit() {
    this.myListsSub = this.repoListsService
      .getMyListsUpdateListener()
      .subscribe((listsData) => {
        this.detectingChangingMyList = listsData.detectedChangingMyLists;
      });
  }

  saveRecentLists() {
    this.repoListsService.storingCurrentMyLists();
  }

  ngOnDestroy() {
    this.myListsSub.unsubscribe();
  }
}
