import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports:[
    SignupComponent
  ],
  declarations: [
    SignupComponent
  ]
})
export class MembershipModule { }
