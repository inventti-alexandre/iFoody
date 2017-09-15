import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './global/bs-navbar/bs-navbar.component';
import { FooterComponent } from './global/footer/footer.component';
import { SearchBarComponent } from './global/search-bar/search-bar.component';
import { BsBreadcrumbComponent } from './bs-breadcrumb/bs-breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    FooterComponent,
    SearchBarComponent,
    BsBreadcrumbComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
