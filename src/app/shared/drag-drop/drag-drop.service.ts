import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DragDropService {
  draggingRepo: { id: string; title: string; url: string; location: string } = {
    id: '',
    title: '',
    url: '',
    location: '',
  };
  isDroped: boolean = false;

  getDraggingRepo() {
    return this.draggingRepo;
  }

  setDraggingRepo(repo: {
    id: string;
    title: string;
    url: string;
    location: string;
  }) {
    this.draggingRepo = repo;
  }

  getDropedState() {
    return this.isDroped;
  }

  dropedInOtherList() {
    this.isDroped = true;
  }

  dragDropSvcInit() {
    this.draggingRepo = {
      id: '',
      title: '',
      url: '',
      location: '',
    };
    this.isDroped = false;
  }
}
