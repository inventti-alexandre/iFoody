import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './global/bs-navbar/bs-navbar.component';
import { FooterComponent } from './global/footer/footer.component';
import { SearchBarComponent } from './global/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    FooterComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
