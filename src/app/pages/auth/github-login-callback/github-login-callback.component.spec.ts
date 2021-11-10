import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubLoginCallbackComponent } from './github-login-callback.component';

describe('GithubLoginCallbackComponent', () => {
  let component: GithubLoginCallbackComponent;
  let fixture: ComponentFixture<GithubLoginCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubLoginCallbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubLoginCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
