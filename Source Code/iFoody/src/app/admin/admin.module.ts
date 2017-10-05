import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MdCheckboxModule, MdDatepickerModule, MdNativeDateModule, MatInputModule, MatButtonModule } from '@angular/material';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
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
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatButtonModule,

  ],
  exports:[
    AdminLayoutComponent,
  ],
  declarations: [
    
  AdminLayoutComponent,
    
  AdminProfileComponent
]
})
export class AdminModule { }
