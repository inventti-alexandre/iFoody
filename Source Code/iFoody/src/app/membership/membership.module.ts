// import { NgbDatepicker, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';  // For Angular Material
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MdCheckboxModule, MdDatepickerModule, MdNativeDateModule, MatInputModule } from '@angular/material';  // For Angular Material
import 'hammerjs';
import {FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { MatButtonModule } from '@angular/material';
import { ResetPasswordComponent } from './components/profile/reset-password/reset-password.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { OpenStoreComponent } from './components/open-store/open-store.component';

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
    MatButtonModule,
    MdCheckboxModule
  ],  
  exports:[
    SignupComponent,
    LoginComponent,
    ProfileComponent,
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    EditProfileComponent,
    OpenStoreComponent
  ]
})
export class MembershipModule { }
