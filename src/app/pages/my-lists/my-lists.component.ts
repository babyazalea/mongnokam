import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RepoList } from 'src/app/components/repo-lists/repo-list/repo-list.model';
import { RepoListsService } from 'src/app/components/repo-lists/repo-lists.service';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css', '../../shared/styles/main.css'],
})
export class MyListsComponent implements OnInit, OnDestroy {
  myLists!: Array<RepoList>;
  myFavoriteLists!: Array<RepoList>;

  private myListsSub!: Subscription;

  constructor(private repoListsService: RepoListsService) {}

  ngOnInit() {
    this.myLists = this.repoListsService.getMyLists();
    if (this.myLists.length > 0) {
      this.myFavoriteLists = this.myLists.filter(
        (repoList) => repoList.isFavorite
      );
    }
    this.myListsSub = this.repoListsService
      .myListsUpdateListener()
      .subscribe((listsData) => {
        this.myLists = listsData.lists;
        this.myFavoriteLists = listsData.lists.filter(
          (repoList) => repoList.isFavorite
        );
      });
  }

  ngOnDestroy(): void {}
}
