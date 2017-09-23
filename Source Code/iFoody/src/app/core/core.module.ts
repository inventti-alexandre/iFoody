import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BsNavbarComponent,
    FooterComponent,
    SearchBarComponent,
    HomeComponent
  ],
  declarations: [
    BsNavbarComponent,
    FooterComponent,
    SearchBarComponent,
    HomeComponent
  ]
})
export class CoreModule { }
