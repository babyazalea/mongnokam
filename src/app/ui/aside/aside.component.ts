import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { RepoListsService } from 'src/app/components/repo-lists/repo-lists.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit, OnDestroy {
  isMakeUpPage!: boolean;
  detectingChangingMyList: boolean = false;
  private myListsSub: Subscription = new Subscription();

  constructor(
    private router: Router,
    private repoListsService: RepoListsService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isMakeUpPage = event.url === '/' ? true : false;
        }
      });
  }

  ngOnInit() {
    this.myListsSub = this.repoListsService
      .myListsUpdateListener()
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
