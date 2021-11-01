import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Repo } from './repo/repo.model';
import { DragDropService } from '../../shared/drag-drop/drag-drop.service';

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
  @Input() repos: Array<Repo> = [];
  @Output() newListNameEvent = new EventEmitter<{
    listId: string;
    listName: string;
  }>();

  // drag & drop state
  draggingInList: boolean = false;
  draggingOver: boolean = false;
  draggingNode: any;
  draggingItemIndex: any;

  // repo-list state
  isDateExpanded: boolean = false;
  isListNameEditing: boolean = false;

  constructor(private dropEventService: DragDropService) {}

  // drag & drop actions
  dragStart(event: DragEvent, index: number, repo: Repo) {
    this.draggingInList = true;
    this.draggingNode = event.target;
    this.dropEventService.setDraggingRepo(repo);
    this.draggingItemIndex = index;
  }

  draggingStyling(id: string) {
    const currentDraggingItem = this.dropEventService.getDraggingRepo();
    if (currentDraggingItem.id === id) {
      return true;
    }
    return false;
  }

  dragEnterInList(event: DragEvent, index: number) {
    event.preventDefault();
    const draggingItemIndex = this.draggingItemIndex;
    const draggingNode = this.draggingNode;
    if (event.target !== draggingNode) {
      const newRepoList = this.repos;
      const currentItem = newRepoList.splice(draggingItemIndex, 1)[0];
      newRepoList.splice(index, 0, currentItem);
      this.draggingItemIndex = index;
      this.repos = newRepoList;
    }
  }

  dragEnterOnList(event: DragEvent) {
    event.preventDefault();
  }

  dragOverOnList(event: DragEvent) {
    event.preventDefault();

    const draggingRepo = this.dropEventService.getDraggingRepo();
    if (draggingRepo.location === this.listId) {
      this.draggingOver = false;
      console.log('dragging on other-list');
    } else if (draggingRepo.location !== this.listId) {
      this.draggingOver = true;
    }
  }

  dragLeaveOnList(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.draggingOver = false;
    console.log('drag-leave-on-list');
  }

  dropOnList(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.draggingOver = false;
    this.draggingInList = false;
    const droppedRepo = this.dropEventService.getDraggingRepo();
    if (droppedRepo.location !== this.listId) {
      this.dropEventService.dropedInOtherList();
      const newItems = this.repos;
      const updatedRepo = { ...droppedRepo, location: this.listId };
      newItems.splice(newItems.length, 0, updatedRepo);
      this.repos = newItems;
    }
  }

  dragEnd() {
    this.draggingInList = false;
    this.draggingOver = false;
    this.draggingNode = null;
    const draggingRepo = this.dropEventService.getDraggingRepo();
    const isDropped = this.dropEventService.getDropedState();
    const currentItems = this.repos;
    let updatedItems;
    if (isDropped) {
      updatedItems = currentItems.filter((repo) => repo.id !== draggingRepo.id);
      this.repos = updatedItems;
    }
    this.dropEventService.dragDropSvcInit();
  }

  // repo-list actions
  dateExpandHandler() {
    this.isDateExpanded = !this.isDateExpanded;
  }

  listNameEditHandler() {
    this.isListNameEditing = true;
  }

  newListNameSubmit(newListName: string) {
    this.newListNameEvent.emit({ listId: this.listId, listName: newListName });
    this.isListNameEditing = false;
  }
}
