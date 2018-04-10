import { StoreItemComponent } from './components/store-item/store-item.component';
import { PaginationModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RatingModule } from 'ngx-bootstrap/rating';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { StoreService } from './services/store.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { BsBreadcrumbComponent } from './components/bs-breadcrumb/bs-breadcrumb.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { BsPaginationComponent } from './components/bs-pagination/bs-pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsRatingComponent } from './components/bs-rating/bs-rating.component';
import { ResultItemComponent } from './components/result-item/result-item.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { NotResultComponent } from './components/not-result/not-result.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // NgbModule,
    RatingModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  exports: [
    BsBreadcrumbComponent,
    BsPaginationComponent,
    ProductItemComponent,
    NotFoundComponent,
    BsRatingComponent,
    StoreItemComponent,
    ResultItemComponent,
    LoadingPageComponent,
    NotResultComponent,
  ],
  declarations: [
    BsBreadcrumbComponent,
    BsPaginationComponent,
    ProductItemComponent,
    NotFoundComponent,
    BsRatingComponent,
    StoreItemComponent,
    ResultItemComponent,
    LoadingPageComponent,
    NotResultComponent,
  ],
  providers: [
    UserService,
    ProductService,
    StoreService,
    AuthService
  ],
})
export class SharedModule { }
