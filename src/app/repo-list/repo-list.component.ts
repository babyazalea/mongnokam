import { Component, Input } from '@angular/core';
import { Repo } from './repo/repo.model';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],
})
export class RepoListComponent {
  @Input() repos: Array<Repo> = [];
}
