import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RepoList } from 'src/app/components/repo-lists/repo-list/repo-list.model';
import { Repo } from 'src/app/components/repo-lists/repo-list/repo/repo.model';

@Injectable({ providedIn: 'root' })
export class RepoListsService {
  // myLists variable
  private myLists: Array<RepoList> = [];
  private detectedChangingMyLists: boolean = false;
  private myListsUpdated = new Subject<{
    lists: Array<RepoList>;
    detectedChangingMyLists: boolean;
  }>();

  // allRepos variable
  private allRepos: Array<Repo> = [];
  private detectedChangingAllRepos: boolean = false;
  private allReposUpadated = new Subject<{
    allRepos: Array<Repo>;
    detectedChangingAllrepos: boolean;
  }>();

  private handleError(error: HttpErrorResponse) {
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

  getAllReposInLocalStorage() {
    const allReposData = localStorage.getItem('allRepos');
    if (allReposData !== null) {
      console.log('all-repos-not-null');
      const allRepos = JSON.parse(allReposData);
      this.allRepos = allRepos;
    }

    return this.allRepos;
  }

  allReposUpdatedListener() {
    return this.allReposUpadated.asObservable();
  }

  getMyListsInLocalStorage() {
    const listsData = localStorage.getItem('listsData');
    if (listsData !== null) {
      const lists = JSON.parse(listsData);
      this.detectedChangingMyLists = true;
      this.myLists = lists;
    }
    return this.myLists;
  }

  getMyLists() {
    this.http
      .get<Array<RepoList>>(
        'https://mongnokam-default-rtdb.firebaseio.com/my-lists.json'
      )
      .pipe(catchError(this.handleError))
      .subscribe((listsData) => {
        this.detectedChangingMyLists = true;
        if (listsData === null) {
          return;
        }
        this.myLists = listsData;
        this.myListsUpdated.next({
          lists: [...this.myLists],
          detectedChangingMyLists: this.detectedChangingMyLists,
        });
      });
  }

  getMyListsUpdateListener() {
    return this.myListsUpdated.asObservable();
  }

  addMyList(listData: RepoList) {
    console.log('add my list');
    this.myLists.push(listData);
    this.detectedChangingMyLists = true;
    this.myListsUpdated.next({
      lists: [...this.myLists],
      detectedChangingMyLists: this.detectedChangingMyLists,
    });
  }

  updatingMyList(updatedRepos: Array<Repo>, listId: string) {
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

  getAllReposUpdateListener() {
    return this.allReposUpadated.asObservable();
  }

  updatingAllRepos(updatedRepos: Array<Repo>) {
    this.allRepos = updatedRepos;
    this.detectedChangingAllRepos = true;
    this.allReposUpadated.next({
      allRepos: [...this.allRepos],
      detectedChangingAllrepos: this.detectedChangingAllRepos,
    });
  }

  storingCurrentMakeUpLocalStorage() {
    const currentMyLists = [...this.myLists];
    const currentMyListsJSON = JSON.stringify(currentMyLists);

    const currentAllRepos = [...this.allRepos];
    const currentAllReposJSON = JSON.stringify(currentAllRepos);

    localStorage.setItem('listsData', currentMyListsJSON);
    localStorage.setItem('allRepos', currentAllReposJSON);
    this.detectedChangingMyLists = false;
    this.myListsUpdated.next({
      lists: currentMyLists,
      detectedChangingMyLists: this.detectedChangingMyLists,
    });
    this.detectedChangingAllRepos = false;
    this.allReposUpadated.next({
      allRepos: currentAllRepos,
      detectedChangingAllrepos: this.detectedChangingAllRepos,
    });
  }

  // storingMyLists() {
  //   const lists = [...this.myLists];
  //   this.http
  //     .put('https://mongnokam-default-rtdb.firebaseio.com/my-lists.json', lists)
  //     .subscribe(
  //       () => {},
  //       (error) => console.log(error),
  //       () => {
  //         this.detectedChangingMyLists = true;
  //         this.myListsUpdated.next({
  //           lists: [...this.myLists],
  //           detectedChangingMyLists: this.detectedChangingMyLists,
  //         });
  //       }
  //     );
  // }

  logging() {
    console.log('just logging');
  }
}
