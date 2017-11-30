import { MatSelectModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

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
  
})
export class UploadingModule { }
