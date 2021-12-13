import { Component, OnInit } from '@angular/core';

import { RepoList } from 'src/app/components/repo-lists/repo-list/repo-list.model';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css', '../../shared/styles/main.css'],
})
export class MyListsComponent implements OnInit {
  myFavoriteLists!: Array<RepoList>;
  myLists!: Array<RepoList>;

  ngOnInit() {}
}
