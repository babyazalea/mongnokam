import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReposService } from 'src/app/components/repo-lists/repo-list/repos/repos.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() allPageNumArray!: Array<Number>;
  @Output() paginatingEvent = new EventEmitter<number>();

  constructor(private reposService: ReposService) {}

  onClickPageButton(pageNum: number) {
    this.paginatingEvent.emit(pageNum);
  }
}
