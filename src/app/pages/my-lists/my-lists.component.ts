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
  myFavoriteLists!: Array<RepoList>;
  myLists!: Array<RepoList>;

  private myListsSub!: Subscription;

  constructor(private repoListsService: RepoListsService) {}

  ngOnInit() {
    this.myLists = this.repoListsService.getMyLists();
    this.myListsSub = this.repoListsService
      .myListsUpdateListener()
      .subscribe((listsData) => {
        this.myLists = listsData.lists;
      });
  }

  ngOnDestroy(): void {}
}
