import { Component, Input } from '@angular/core';

import { Repo } from '../../components/repo-list/repo/repo.model';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css'],
})
export class ListContainerComponent {
  @Input() lists: Array<{
    id: string;
    'list-name': string;
    'list-repos': Array<Repo>;
  }> = [];
}
