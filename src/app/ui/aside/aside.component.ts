import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MyListsService } from 'src/app/shared/my-lists/my-lists.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit, OnDestroy {
  canSaveLists!: boolean;
  private myListsSub: Subscription = new Subscription();

  constructor(private myListsService: MyListsService) {}

  ngOnInit() {
    this.myListsSub = this.myListsService
      .getMyListsUpdateListener()
      .subscribe((listsData) => {
        this.canSaveLists = !listsData.isInitLists;
      });
  }

  saveRecentLists() {
    this.myListsService.storingMyLists();
  }

  ngOnDestroy() {
    this.myListsSub.unsubscribe();
  }
}
