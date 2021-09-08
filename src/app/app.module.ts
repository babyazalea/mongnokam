import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MakeUpComponent } from './make-up/make-up.component';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { PlateComponent } from './plate/plate.component';
import { ListBoxComponent } from './list-box/list-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MakeUpComponent,
    PlateComponent,
    ListBoxComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
