import { AdminComponent } from './admin/admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MdCheckboxModule,
          MdDatepickerModule, 
          MdNativeDateModule, 
          MatInputModule, 
          MatButtonModule, 
          MdSelectModule } from '@angular/material';
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
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MatInputModule,
    MdSelectModule,
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


  ]
})
export class AdminModule { }
