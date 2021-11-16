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
    const authData = localStorage.getItem('authData');
    const parsedAuthData = JSON.parse(authData!);
    const token = parsedAuthData.token;

    if (token) {
      this.http
        .get('https://api.github.com/user/repos', {
          headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json',
          },
          params: {
            per_page: 100,
            page: 2,
          },
        })
        .subscribe((res: any) => {
          let repos: Array<Repo> = [];
          res.map((responseData: any, index: string) => {
            const repository = {
              id: responseData.id,
              title: responseData.name,
              url: responseData.html_url,
              location: 'all-repos',
            };
            repos.push(repository);
          });
          this.detectedChangingAllRepos = true;
          this.allRepos = repos;
          this.allReposUpadated.next({
            allRepos: [...this.allRepos],
            detectedChangingAllrepos: this.detectedChangingAllRepos,
          });
        });
    }

    return;
  }

  getAllReposInLocalStorage() {
    const allReposData = localStorage.getItem('allRepos');
    if (allReposData !== null) {
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
