import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RepoList } from 'src/app/components/repo-list/repo-list.model';

@Injectable({ providedIn: 'root' })
export class MyListsService {
  private myLists: Array<RepoList> = [];
  private isInitLists: boolean = true;
  private myListsUpdated = new Subject<{
    lists: Array<RepoList>;
    isInitLists: boolean;
  }>();

  // private testingList = [
  //   {
  //     id: 'list1',
  //     createdDate: Date.now().toLocaleString(),
  //     'list-name': 'react',
  //     'list-repos': [
  //       {
  //         id: '10',
  //         title: 'test-my-repos11',
  //         url: 'https://www.google.com/',
  //         location: 'list0',
  //       },
  //       {
  //         id: '11',
  //         title: 'test-my-repos11',
  //         url: 'https://www.google.com/',
  //         location: 'list1',
  //       },
  //       {
  //         id: '12',
  //         title: 'test-my-repos12',
  //         url: 'https://www.google.com/',
  //         location: 'list1',
  //       },
  //       {
  //         id: '13',
  //         title: 'test-my-repos13',
  //         url: 'https://www.google.com/',
  //         location: 'list1',
  //       },
  //       {
  //         id: '14',
  //         title: 'test-my-repos14',
  //         url: 'https://www.google.com/',
  //         location: 'list1',
  //       },
  //     ],
  //   },
  // ];

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
    this.http
      .get<Array<RepoList>>(
        'https://mongnokam-default-rtdb.firebaseio.com/my-lists.json'
      )
      .pipe(catchError(this.handleError))
      .subscribe((listsData) => {
        this.isInitLists = true;
        if (listsData === null) {
          return;
        }
        this.myLists = listsData;
        this.myListsUpdated.next({
          lists: [...this.myLists],
          isInitLists: this.isInitLists,
        });
      });
  }

  getMyListsUpdateListener() {
    return this.myListsUpdated.asObservable();
  }

  addMylist(listData: RepoList) {
    this.myLists.push(listData);
    this.isInitLists = false;
    this.myListsUpdated.next({
      lists: [...this.myLists],
      isInitLists: this.isInitLists,
    });
  }

  storingMyLists() {
    const listsData = [...this.myLists];
    this.http
      .put(
        'https://mongnokam-default-rtdb.firebaseio.com/my-lists.json',
        listsData
      )
      .subscribe(
        () => {},
        (error) => console.log(error),
        () => {
          this.isInitLists = true;
          this.myListsUpdated.next({
            lists: [...this.myLists],
            isInitLists: this.isInitLists,
          });
        }
      );
  }

  logging() {
    console.log('just logging');
  }
}
