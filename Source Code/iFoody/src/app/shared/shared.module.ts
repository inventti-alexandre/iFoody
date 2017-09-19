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

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BsBreadcrumbComponent,
    BsPaginationComponent,
    ProductItemComponent,
    NotFoundComponent
  ],
  declarations: [
    BsBreadcrumbComponent,
    BsPaginationComponent,
    ProductItemComponent,
    NotFoundComponent
  ],
  providers: [
    UserService,
    ProductService,
    StoreService,
    AuthService
  ]
})
export class SharedModule { }
