import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { AsideComponent } from './ui/aside/aside.component';
import { RepoListComponent } from './components/repo-lists/repo-list/repo-list.component';
import { RepoComponent } from './components/repo-lists/repo-list/repo/repo.component';
import { MakeUpComponent } from './pages/make-up/make-up.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AsideComponent,
    RepoListComponent,
    RepoComponent,
    MakeUpComponent,
    MyListsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
