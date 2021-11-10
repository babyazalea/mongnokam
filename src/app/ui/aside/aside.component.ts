import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RepoListsService } from 'src/app/components/repo-lists/repo-lists.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit, OnDestroy {
  canSaveLists!: boolean;
  private myListsSub: Subscription = new Subscription();

  constructor(private repoListsService: RepoListsService) {}

  ngOnInit() {
    this.myListsSub = this.repoListsService
      .getMyListsUpdateListener()
      .subscribe((listsData) => {
        this.canSaveLists = !listsData.isInitMyLists;
      });
  }

  saveRecentLists() {
    const isAuth = false;

    if (!isAuth) {
      this.repoListsService.storingCurrentMakeUpLocalStorage();
      return;
    }

    this.repoListsService.storingMyLists();
  }

  ngOnDestroy() {
    this.myListsSub.unsubscribe();
  }
}
