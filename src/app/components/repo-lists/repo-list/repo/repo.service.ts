import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Repo } from './repo.model';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  // allRepos variable
  private allRepos: Array<Repo> = [];
  private detectedChangingAllRepos: boolean = false;
  private allReposUpadated = new Subject<{
    allRepos: Array<Repo>;
    detectedChangingAllrepos: boolean;
  }>();

  constructor(private http: HttpClient) {}

  loadRepos() {
    const token = localStorage.getItem('accessToken');

    if (token) {
      this.http
        .get('https://api.github.com/user/repos', {
          headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .subscribe((response: any) => {
          console.log(response);
        });
    }
  }

  getAllReposInLocalStorage() {
    const allReposData = localStorage.getItem('allRepos');
    if (allReposData !== null) {
      console.log('all-repos-not-null');
      const allRepos = JSON.parse(allReposData);
      this.allRepos = allRepos;
    }

    return this.allRepos;
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

  storingCurrentAllRepos() {
    const currentAllRepos = [...this.allRepos];
    const currentAllReposJSON = JSON.stringify(currentAllRepos);
    localStorage.setItem('allRepos', currentAllReposJSON);
    this.detectedChangingAllRepos = false;
    this.allReposUpadated.next({
      allRepos: currentAllRepos,
      detectedChangingAllrepos: this.detectedChangingAllRepos,
    });
  }
}
