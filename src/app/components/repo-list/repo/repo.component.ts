import { Component, Input } from '@angular/core';
import { Repo } from './repo.model';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css'],
})
export class RepoComponent {
  @Input() repoData: Repo = {
    id: '',
    title: '',
    url: '',
    location: '',
  };
  @Input() isDragging = false;
}
