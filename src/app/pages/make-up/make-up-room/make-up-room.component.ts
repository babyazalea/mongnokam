import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Repo } from '../../../components/repo-lists/repo-list/repos/repo/repo.model';
import { RepoList } from '../../../components/repo-lists/repo-list/repo-list.model';
import { ReposService } from '../../../components/repo-lists/repo-list/repos/repos.service';

@Component({
  selector: 'app-make-up-room',
  templateUrl: './make-up-room.component.html',
  styleUrls: ['./make-up-room.component.css'],
})
export class MakeUpRoomComponent implements OnInit {
  @Input() isProviderLoading!: boolean;
  @Input() allRepos!: Array<Repo>;
  @Input() allPageNumArray!: Array<number>;
  @Output() loadReposEvent = new EventEmitter<boolean>();
  myLists!: Array<RepoList>;

  constructor(private reposService: ReposService) {}

  ngOnInit(): void {}

  loadReposPageHandler(pageNum: number) {
    this.loadReposEvent.emit(true);
    this.reposService.loadRepos(pageNum);
  }
}
