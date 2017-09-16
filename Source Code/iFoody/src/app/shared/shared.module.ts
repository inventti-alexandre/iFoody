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
    CommonModule
  ],
  exports: [
    BsBreadcrumbComponent,
    BsPaginationComponent,
    ProductItemComponent
  ],
  declarations: [
    BsBreadcrumbComponent,
    BsPaginationComponent,
    ProductItemComponent
  ],
  providers: [
    UserService,
    ProductService,
    StoreService,
    AuthService
  ]
})
export class SharedModule { }
