import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { AsideComponent } from './ui/aside/aside.component';
import { RepoListComponent } from './components/repo-lists/repo-list/repo-list.component';
import { RepoComponent } from './components/repo-lists/repo-list/repos/repo/repo.component';
import { MakeUpComponent } from './pages/make-up/make-up.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, GithubAuthProvider } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { PaginatorComponent } from './ui/paginator/paginator.component';
import { AlertBarComponent } from './ui/alert-bar/alert-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AsideComponent,
    PaginatorComponent,
    RepoListComponent,
    RepoComponent,
    MakeUpComponent,
    MyListsComponent,
    AlertBarComponent,
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [GithubAuthProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
