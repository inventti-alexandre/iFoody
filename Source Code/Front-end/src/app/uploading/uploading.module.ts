import { AuthService } from './../shared/services/auth.service';
import { StoreService } from './../shared/services/store.service';
import { ProductService } from '../shared/services/product.service';
import { MatSelectModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UserService } from '../shared/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
  ],
  exports: [
    ProductUploadComponent,
    FileUploadComponent
  ],
  declarations: [
    ProductUploadComponent,
    FileUploadComponent
  ],
  providers: [
    UserService,
    ProductService,
    StoreService,
    AuthService
  ],
  
})
export class UploadingModule { }
