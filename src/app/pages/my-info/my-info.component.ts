import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../shared/user/user.model';
import { UserService } from '../../shared/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css'],
})
export class MyInfoComponent implements OnInit, OnDestroy {
  user!: User;

  private userSub!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userDataInLocalStorage = localStorage.getItem('userData');
    this.user = JSON.parse(userDataInLocalStorage!);
    this.userSub = this.userService
      .getUserUpdateListener()
      .subscribe((userData) => (this.user = userData.user));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
