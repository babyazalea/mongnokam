import { Component, Input } from '@angular/core';

import { Repo } from './repos/repo/repo.model';
import { DragDropService } from '../../../shared/drag-drop/drag-drop.service';
import { RepoListsService } from 'src/app/components/repo-lists/repo-lists.service';
import { AlertBarService } from 'src/app/ui/alert-bar/alert-bar.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],
})
export class RepoListComponent {
  @Input() isAllRepos: boolean = false;
  @Input() listName: string = '';
  @Input() createdDate: string = '';
  @Input() listId: string = '';
  @Input() listIndex!: number;
  @Input() isFavorite!: boolean;
  @Input() repos: Array<Repo> = [];

  // drag & drop state
  initRepos!: Array<Repo>;
  draggingInList: boolean = false;
  draggingOver: boolean = false;
  draggingNode!: EventTarget | null;
  draggingRepoIndex!: number;

  // repo-list state
  isDateExpanded: boolean = false;
  isListNameEditing: boolean = false;

  constructor(
    private dropEventService: DragDropService,
    private repoListsService: RepoListsService,
    private alertBarService: AlertBarService
  ) {}

  // drag & drop actions

  // 드래그를 시작하는 순간 발생하는 drag-start-event-handler
  dragStart(event: DragEvent, index: number, repo: Repo) {
    this.initRepos = this.repos;
    this.draggingInList = true; // drag-start event는 무조건, 어느 list이건 list 내부에서 발생
    this.draggingNode = event.target; // 드래그 중인 repo-component의 HTML Element 자체를 컴포넌트 내에 저장
    this.dropEventService.setDraggingRepo(repo); // drag-drop-service 안에 드래그 중인 repo의 데이터를 저장
    this.draggingRepoIndex = index; // 드래그 중인 repo의 index 저장
  }

  // repo를 드래그 중일 때 css-styling(overlay) 적용
  draggingStyling(id: string, location: string) {
    const currentDraggingItem = this.dropEventService.getDraggingRepo();
    return (
      currentDraggingItem.id === id && currentDraggingItem.location === location
    );
  }

  // 드래그가 현재의 repo-list 안에서 이루어지는 중일 때 발생하는 drag-enter-event-handler
  dragEnterInList(event: DragEvent, index: number) {
    event.preventDefault(); // default-event를 방지
    this.draggingInList = true;
    const draggingRepoIndex = this.draggingRepoIndex;
    const draggingNode = this.draggingNode;
    // 현재의 이벤트(드래그) 타겟과 drag-start-event에서 저장된 dragging-node가 동일한 객체인지 확인
    if (event.target !== draggingNode) {
      // 서로 다른 객체일 경우: drag-entering된 지점의 repo와 드래그 중인 repo가 서로 다른 repo임이 확인됌.
      const newRepoList = this.repos; // 현재의 repos(repo들을 담고 있는 배열)를 복사.
      const currentItem = newRepoList.splice(draggingRepoIndex, 1)[0]; // 드래그 중인 repo의 index를 이용해 리스트 내에서 드래그 중인 repo-item(node가 아닌 repo)를 할당.
      newRepoList.splice(index, 0, currentItem); // 앞선 데이터와 splice 함수를 이용해 newRepoList를 업데이트.
      // 변경된 드래그 중인 repo의 인덱스와 repo-list를 새로 할당.
      this.draggingRepoIndex = index;
      this.repos = newRepoList;
    }
  }

  // drag-over-event와의 중복 방지.
  dragEnterOnList(event: DragEvent) {
    event.preventDefault();
  }

  // 드래그된 repo가 repo-list 위에 있을 때
  dragOverOnList(event: DragEvent) {
    event.preventDefault();

    const draggingRepo = this.dropEventService.getDraggingRepo();
    // 드래그 중인 repo의 location 프로퍼티가 현재 repo-list의 list-id와 같은지 확인.
    // (repo는 생성 당시 repo-list의 id를 location 프로퍼티로 부여 받음)
    if (draggingRepo.location === this.listId) {
      // 현재 repo-list 안에서 이동 중(drag-enter-in-list와 같음)
      this.draggingOver = false;
    } else if (draggingRepo.location !== this.listId) {
      // 드래그 되어 다른 repo-list 위에 있음
      this.draggingOver = true;
    }
  }

  // 드래그 되어 현재의 repo-list 위치를 벗어날 경우
  dragLeaveOnList(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.draggingOver = false;
  }

  // drag-drop-event, 현재의 repo-list에서 drop-event가 발생했을 때
  // drop-event는 드래그 중인 repo가 drop된 repo-list에서만 발생!
  // drop-event가 발생되는 repo-list는 다른 drag-event가 발생하지 않으며,
  // 컴포넌트의 착오로 다른 drag-event가 발생하지 않도록 방지함.
  dropOnList(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.draggingOver = false;
    this.draggingInList = false;

    // all-repos-lists의 경우 업데이트를 방지
    if (this.isAllRepos) {
      return;
    }

    const droppedRepo = this.dropEventService.getDraggingRepo();
    // 다른 리스트에서 온 것인지 & 현재 리스트에 해당 repo의 중복 여부를 확인
    const sameRepo = this.repos.find((repo) => repo.id === droppedRepo.id);

    // repo-list안에 중복된 레포지토리를 옮기려고 시도할 경우
    if (sameRepo) {
      this.alertBarService.setAlert(
        '옮기려는 저장소와 똑같은 저장소가 해당 리스트에 이미 존재해서 옮길 수 없습니다.'
      );
      return;
    }

    if (droppedRepo.location !== this.listId) {
      this.dropEventService.dropedInOtherList();
      const newRepos = this.repos;
      const updatedRepo = { ...droppedRepo, location: this.listId };
      newRepos.splice(newRepos.length, 0, updatedRepo); // 새로운 repo를 리스트의 맨 밑에 추가.
      this.repos = newRepos;

      this.repoListsService.updatingMyLists(this.repos, this.listId);
    }
  }

  // drag-event 모두 종료.
  // drag-end-event는 드래그가 시작된 repo-list 컴포넌트에서만 발생함.
  dragEnd() {
    // all-repos-lists의 경우 업데이트를 방지
    if (this.isAllRepos) {
      this.dropEventService.dragDropSvcInit();
      return;
    }

    // 드래그가 끝난 시점에 다른 repo-list 컴포넌트에서 drop-event가 발생했는지 확인.
    const isDropped = this.dropEventService.getDropedState();

    if (isDropped) {
      console.log('dropped');
      // 발생했을 경우: 현재의 repo-list에서 드래그된 repo가 다른 repo-list 컴포넌트에 drop 되었음을 의미하므로, lists를 업데이트.
      const draggingRepo = this.dropEventService.getDraggingRepo();
      let updatedRepos;
      updatedRepos = this.repos.filter((repo) => repo.id !== draggingRepo.id);
      this.repos = updatedRepos;
    }

    if (this.initRepos === this.repos) {
      console.log('just same repos');
      this.draggingInList = false;
      this.draggingOver = false;
      this.draggingNode = null;
      return;
    }

    this.dropEventService.dragDropSvcInit();

    this.repoListsService.updatingMyLists(this.repos, this.listId);
  }

  // repo-list actions
  dateExpandHandler() {
    this.isDateExpanded = !this.isDateExpanded;
  }

  listNameEditHandler() {
    this.isListNameEditing = true;
  }

  newListNameSubmit(newListName: string) {
    this.repoListsService.editingListName(newListName, this.listId);
    this.isListNameEditing = false;
  }

  listNameEditCancel() {
    this.isListNameEditing = false;
  }

  listFavoriteHandler(isFavorite: boolean, listIndex: number) {
    this.isFavorite = isFavorite;
    this.repoListsService.toggleFavoriteList(isFavorite, listIndex);
  }
}
