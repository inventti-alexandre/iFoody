import { FileUploadComponent } from './../uploading/file-upload/file-upload.component';
import { AuthService } from './../shared/services/auth.service';
import { StoreService } from './../shared/services/store.service';
import { ProductService } from './../shared/services/product.service';
import { UserService } from './../shared/services/user.service';
import { ProfileItemContainerComponent } from './components/shared/profile-layout/profile-item-container';
import { NgSwitch } from '@angular/common';
import { ProfileService } from './services/profile.service';
import { SharedModule } from './../shared/shared.module';
import { FavoriteListComponent } from './components/user/favorite-list/favorite-list.component';
// import { NgbDatepicker, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';  // For Angular Material
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/shared/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';  // For Angular Material
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
import { ProfileDirective } from './directives/profile.directive';
import { UploadingModule } from '../uploading/uploading.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    MatCheckboxModule, // For Angular Material
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(), 
    MatButtonModule,
    MatCheckboxModule,
    SharedModule,
    UploadingModule
  ],  
  exports:[
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    ProfileItemContainerComponent,
    NgSwitch  
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
    FavoriteListComponent,
    ProfileDirective,
    ProfileItemContainerComponent
  ],
  entryComponents: [
    ChangePasswordComponent,
    ResetPasswordComponent,
    UserProfileComponent,
    StoreProfileComponent,
    FavoriteListComponent,
    FileUploadComponent
  ],
  providers: [
    ProfileService,
    UserService,
    ProductService,
    StoreService,
    AuthService
  ]
})
export class MembershipModule { }
