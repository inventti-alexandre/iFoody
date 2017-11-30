import { StoreItemComponent } from './components/store-item/store-item.component';
import { PaginationModule } from 'ngx-bootstrap/ng2-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    RatingModule.forRoot(),
    FormsModule,
    PaginationModule.forRoot()
  ],
  exports: [
    BsBreadcrumbComponent,
    BsPaginationComponent,
    ProductItemComponent,
    NotFoundComponent,
    BsRatingComponent,
    StoreItemComponent
  ],
  declarations: [
    BsBreadcrumbComponent,
    BsPaginationComponent,
    ProductItemComponent,
    NotFoundComponent,
    BsRatingComponent,
    StoreItemComponent
  ],
  providers: [
    UserService,
    ProductService,
    StoreService,
    AuthService
  ],
})
export class SharedModule { }
