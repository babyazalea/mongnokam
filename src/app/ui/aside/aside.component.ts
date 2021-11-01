import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MyListsService } from 'src/app/shared/my-lists/my-lists.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit, OnDestroy {
  isListsUpdated: boolean = false;
  private myListsSub: Subscription = new Subscription();

  constructor(private myListsService: MyListsService) {}

  ngOnInit() {
    this.myListsSub = this.myListsService
      .getMyListsUpdateListener()
      .subscribe((listData) => {
        if (listData) {
          this.isListsUpdated = true;
        }
      });
  }

  saveRecentLists() {
    this.myListsService.storingMyLists();
  }

  ngOnDestroy() {
    this.myListsSub.unsubscribe();
  }
}
