import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeUpComponent } from './pages/make-up/make-up.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';

const routes: Routes = [
  { path: '', component: MakeUpComponent },
  {
    path: 'my-lists',
    component: MyListsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
