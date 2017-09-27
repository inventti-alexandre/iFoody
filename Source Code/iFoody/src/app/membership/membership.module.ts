import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  // For Angular Material
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupByEmailComponent } from './components/signup-by-email/signup-by-email.component';
import { BrowserModule } from '@angular/platform-browser';
import { MdCheckboxModule } from '@angular/material';  // For Angular Material
import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    MdCheckboxModule, // For Angular Material
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
