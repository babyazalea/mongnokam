import { Component, Input } from '@angular/core';

import { Repo } from 'src/app/components/repo-list/repo/repo.model';

@Component({
  selector: 'app-list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.css'],
})
export class ListBoxComponent {
  // @Input() list!: {
  //   id: string;
  //   'list-name': string;
  //   'list-repos': Array<Repo>;
  // };
}
