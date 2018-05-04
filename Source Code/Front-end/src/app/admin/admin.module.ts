import { AuthService } from './../shared/services/auth.service';
import { StoreService } from './../shared/services/store.service';
import { ProductService } from './../shared/services/product.service';
import { UserService } from './../shared/services/user.service';
import { AdminComponent } from './admin/admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatCheckboxModule,
          MatDatepickerModule, 
          MatNativeDateModule, 
          MatInputModule, 
          MatButtonModule, 
          MatSelectModule } from '@angular/material';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { AdminStoreComponent } from './admin-store/admin-store.component';
import { StoreItemComponent } from './admin-store/store-item/store-item.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { UserItemComponent } from './admin-user/user-item/user-item.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminProductItemComponent } from './admin-product/admin-product-item/admin-product-item.component';
import { AdminStatisticComponent } from './admin-statistic/admin-statistic.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatButtonModule,

  ],
  exports: [
    AdminLayoutComponent,
    
    AdminProfileComponent,

    AdminStoreComponent,

    StoreItemComponent,

    AdminUserComponent,
    
    UserItemComponent,

    AdminProductComponent,
    
    AdminProductItemComponent,
    AdminComponent
    
  ],
  declarations: [

    AdminLayoutComponent,

    AdminProfileComponent,

    AdminStoreComponent,

    StoreItemComponent,

    AdminUserComponent,

    UserItemComponent,

    AdminProductComponent,

    AdminProductItemComponent,

    AdminComponent,

    AdminStatisticComponent,


  ],
  providers: [
    UserService,
    ProductService,
    StoreService,
    AuthService
  ],
    
})
export class AdminModule { }
