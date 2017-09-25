import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupByEmailComponent } from './components/signup-by-email/signup-by-email.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // NgbModule
  ],
  exports:[
    SignupComponent,
    SignupByEmailComponent
  ],
  declarations: [
    SignupComponent,
    SignupByEmailComponent
  ]
})
export class MembershipModule { }
