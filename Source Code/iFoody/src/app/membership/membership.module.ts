import { SharedModule } from './../shared/shared.module';
import { WishListComponent } from './components/user/wish-list/wish-list.component';
// import { NgbDatepicker, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';  // For Angular Material
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/shared/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MdCheckboxModule, MdDatepickerModule, MdNativeDateModule, MatInputModule } from '@angular/material';  // For Angular Material
import 'hammerjs';
import {FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginComponent } from './components/shared/login/login.component';
import { ProfileComponent } from './components/shared/profile-layout/profile.component';
import { ChangePasswordComponent } from './components/shared/change-password/change-password.component';
import { MatButtonModule } from '@angular/material';
import { ResetPasswordComponent } from './components/shared/reset-password/reset-password.component';
import { OpenStoreComponent } from './components/shared/open-store/open-store.component';
import { StoreProfileComponent } from './components/store/store-profile/store-profile.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

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
    MdCheckboxModule,
    SharedModule
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
    OpenStoreComponent,
    StoreProfileComponent,
    UserProfileComponent,
    WishListComponent
  ]
})
export class MembershipModule { }
