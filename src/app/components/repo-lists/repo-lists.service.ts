import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RepoList } from 'src/app/components/repo-lists/repo-list/repo-list.model';
import { Repo } from 'src/app/components/repo-lists/repo-list/repos/repo/repo.model';

@Injectable({ providedIn: 'root' })
export class RepoListsService {
  // myLists variable
  private myLists: Array<RepoList> = [];
  private detectedChangingMyLists: boolean = false;
  private myListsUpdated = new Subject<{
    lists: Array<RepoList>;
    detectedChangingMyLists: boolean;
  }>();

  private static handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  constructor(private http: HttpClient) {}

  getMyLists() {
    return this.myLists;
  }

  loadMyListsFromFirebase() {
    const userData = localStorage.getItem('userData');
    const authData = localStorage.getItem('authData');

    if (!userData) {
      return;
    }

    const userId = JSON.parse(userData!).userId;
    const token = JSON.parse(authData!).token;
    const params = new HttpParams({ fromString: `?auth=${token}` });

    this.http
      .get<Array<RepoList>>(
        `https://mongnokam-default-rtdb.firebaseio.com/my-lists/${userId}.json`,
        { params }
      )
      .pipe(catchError(RepoListsService.handleError))
      .subscribe((listsData) => {
        if (listsData === null) {
          return;
        }
        this.detectedChangingMyLists = false;
        this.myLists = listsData;
        this.myListsUpdated.next({
          lists: [...this.myLists],
          detectedChangingMyLists: this.detectedChangingMyLists,
        });
      });
  }

  myListsUpdateListener() {
    return this.myListsUpdated.asObservable();
  }

  addMyList(listData: RepoList) {
    this.myLists.push(listData);
    this.detectedChangingMyLists = true;
    this.myListsUpdated.next({
      lists: [...this.myLists],
      detectedChangingMyLists: this.detectedChangingMyLists,
    });
  }

  updatingMyLists(updatedRepos: Array<Repo>, listId: string) {
    const myLists = this.myLists;

    const foundList = myLists.find((list) => list.id === listId);
    const foundListIndex = myLists.findIndex((list) => list.id === listId);

    const updatedList = {
      ...foundList!,
      'list-repos': updatedRepos,
    };

    myLists.splice(foundListIndex, 1, updatedList);

    this.myLists = myLists;

    this.detectedChangingMyLists = true;
    this.myListsUpdated.next({
      lists: [...this.myLists],
      detectedChangingMyLists: this.detectedChangingMyLists,
    });
  }

  editingListName(listName: string, listId: string) {
    const myLists = this.myLists;

    const foundList = myLists.find((list) => list.id === listId);
    const foundListIndex = myLists.findIndex((list) => list.id === listId);

    const updatedList = {
      ...foundList!,
      'list-name': listName,
    };

    myLists.splice(foundListIndex, 1, updatedList);
    this.myLists = myLists;

    this.detectedChangingMyLists = true;
    this.myListsUpdated.next({
      lists: [...this.myLists],
      detectedChangingMyLists: this.detectedChangingMyLists,
    });
  }

  toggleFavoriteList(isFavorite: boolean, repoListIndex: number) {
    const myLists = this.myLists;
    myLists[repoListIndex].isFavorite = isFavorite;

    this.myLists = myLists;
    console.log(this.myLists);

    this.detectedChangingMyLists = true;
    this.myListsUpdated.next({
      lists: [...this.myLists],
      detectedChangingMyLists: this.detectedChangingMyLists,
    });
  }

  storingCurrentMyLists() {
    const myLists = [...this.myLists];
    const userData = localStorage.getItem('userData');
    const authData = localStorage.getItem('authData');

    const userId = JSON.parse(userData!).userId;
    const token = JSON.parse(authData!).token;
    const params = new HttpParams({ fromString: `?auth=${token}` });

    console.log(myLists);

    this.http
      .put(
        `https://mongnokam-default-rtdb.firebaseio.com/my-lists/${userId}.json`,
        myLists,
        { params }
      )
      .pipe(catchError(RepoListsService.handleError))
      .subscribe();

    this.detectedChangingMyLists = false;
    this.myListsUpdated.next({
      lists: myLists,
      detectedChangingMyLists: this.detectedChangingMyLists,
    });
  }

  logging() {
    console.log('just logging');
  }
}
