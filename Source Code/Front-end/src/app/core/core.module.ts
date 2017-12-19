import { CategoryService } from '../shared/services/category.service';
import { AuthService } from './../shared/services/auth.service';
import { StoreService } from './../shared/services/store.service';
import { ProductService } from './../shared/services/product.service';
import { UserService } from './../shared/services/user.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
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
import { ButtonsModule } from 'ngx-bootstrap/buttons';

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
    FormsModule,
    BrowserModule,
    HttpModule,
    ButtonsModule
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
  ],
  providers: [
    UserService,
    ProductService,
    StoreService,
    AuthService,
    CategoryService
  ],
})
export class CoreModule { }
