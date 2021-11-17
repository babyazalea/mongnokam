import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Repo } from './repo/repo.model';

@Injectable({
  providedIn: 'root',
})
export class ReposService {
  // allRepos variable
  private allRepos!: Array<Repo>;
  private detectedChangingAllRepos: boolean = false;
  private allReposUpadated = new Subject<{
    allRepos: Array<Repo>;
    detectedChangingAllrepos: boolean;
  }>();

  constructor(private http: HttpClient) {}

  loadRepos(pageNum: number) {
    const authData = localStorage.getItem('authData');
    const parsedAuthData = JSON.parse(authData!);
    const token = parsedAuthData.token;

    this.http
      .get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        },
        params: {
          per_page: 30,
          page: pageNum,
        },
      })
      .subscribe((res: any) => {
        let repos: Array<Repo> = [];

        res.map((responseData: any) => {
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
    // this.allRepos = dummyDatas;
    this.detectedChangingAllRepos = true;
    console.log(this.allRepos);
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
