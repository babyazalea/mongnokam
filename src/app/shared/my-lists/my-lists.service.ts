import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RepoList } from 'src/app/components/repo-list/repo-list.model';

@Injectable({ providedIn: 'root' })
export class MyListsService {
  private myLists: Array<RepoList> = [];
  private myListsUpdated = new Subject<Array<RepoList>>();

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

  getMyLists() {
    // this.http
    //   .get<Array<RepoList>>(
    //     'https://mongnokam-default-rtdb.firebaseio.com/my-lists.json'
    //   )
    //   .pipe(catchError(this.handleError))
    //   .subscribe((lists) => {
    //     console.log(lists);
    //     this.myLists = lists;
    //   });
    return [...this.myLists];
  }

  getMyListsUpdateListener() {
    return this.myListsUpdated.asObservable();
  }

  addMylist(listData: RepoList) {
    this.myLists.push(listData);
    this.myListsUpdated.next([...this.myLists]);
  }

  storingMyLists() {
    const listsData = [...this.myLists];
    this.http
      .put(
        'https://mongnokam-default-rtdb.firebaseio.com/lists.json',
        listsData
      )
      .subscribe((data) => console.log(data));
  }

  logging() {
    console.log('just logging');
  }
}
