// import { NgbDatepicker, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';  // For Angular Material
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupByEmailComponent } from './components/signup-by-email/signup-by-email.component';
import { BrowserModule } from '@angular/platform-browser';
import { MdCheckboxModule, MdDatepickerModule, MdNativeDateModule, MatInputModule } from '@angular/material';  // For Angular Material
import 'hammerjs';
import {FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    MdCheckboxModule, // For Angular Material
    MdDatepickerModule,
    MdNativeDateModule,
    MatInputModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(), 
    // NgbModule,
    // NgbDatepickerModule
  ],  
  exports:[
    SignupComponent,
    SignupByEmailComponent,
    // MdButtonModule

  ],
  declarations: [
    SignupComponent,
    SignupByEmailComponent
  ]
})
export class MembershipModule { }
