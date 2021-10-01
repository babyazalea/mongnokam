import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MakeUpComponent } from './pages/make-up/make-up.component';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { RepoComponent } from './components/repo-list/repo/repo.component';
import { ListBoxComponent } from './ui/list-box/list-box.component';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { PlateComponent } from './ui/plate/plate.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ListBoxComponent,
    PlateComponent,
    MakeUpComponent,
    RepoListComponent,
    RepoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
