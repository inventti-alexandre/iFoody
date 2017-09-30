import { MdCheckboxModule,MatDatepickerModule } from '@angular/material';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MdCheckboxModule,
    MatDatepickerModule,
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
