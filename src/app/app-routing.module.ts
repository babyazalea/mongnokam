import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeUpComponent } from './pages/make-up/make-up.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { MyInfoComponent } from './pages/my-info/my-info.component';

const routes: Routes = [
  { path: '', component: MakeUpComponent },
  {
    path: 'my-lists',
    component: MyListsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-info',
    component: MyInfoComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
