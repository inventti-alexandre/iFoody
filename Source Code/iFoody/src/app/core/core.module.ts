import { FormsModule } from '@angular/forms';
import { SearchingModule } from './../searching/searching.module';
import { UploadingModule } from './../uploading/uploading.module';
import { AdminModule } from './../admin/admin.module';
import { MembershipModule } from '../membership/membership.module';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { RepresentativeProductComponent } from './components/representative-product/representative-product.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MembershipModule,
    AdminModule,
    SharedModule,
    UploadingModule,
    SearchingModule,
    FormsModule
  ],
  exports: [
    BsNavbarComponent,
    FooterComponent,
    SearchBarComponent,
    HomeComponent,
    SliderComponent,
    RepresentativeProductComponent
  ],
  declarations: [
    BsNavbarComponent,
    FooterComponent,
    SearchBarComponent,
    HomeComponent,
    SliderComponent,
    RepresentativeProductComponent
  ]
})
export class CoreModule { }
