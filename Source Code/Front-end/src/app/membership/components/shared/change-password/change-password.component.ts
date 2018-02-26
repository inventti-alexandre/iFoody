import { AuthService } from './../../../../shared/services/auth.service';
import { ProfileChildren } from './../../../models/profileChildren';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import * as apiUrl from '../../../../constant/apiUrl';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, ProfileChildren {
  inputForm: FormGroup;
  userId: string;
  email: string;
  @Input() data: any;
  constructor(private _userService: UserService, private _authService: AuthService) {}

  ngOnInit() {
    
    this.inputForm = new FormGroup({
      oldPassword: new FormControl(),
      newPassword: new FormControl(),
      confirmPassword: new FormControl(),
    });

    this.userId = localStorage.getItem(apiUrl.UserId);
    
  }

  onSubmit(input: any) {  
    console.log("onSubmit works");
    console.log(input);
    // Check valid form
    if(!this.inputForm.valid) {
      return this.inputForm.reset();
    }

    // Check Same password from two fields
    if(this.inputForm.get("newPassword").value === this.inputForm.get("confirmPassword").value) {
      if(this.inputForm.get('oldPassword').value) {
        if(this._authService.isAuthenticated) {
          console.log(this.userId);
          this._userService.getUserById(this.userId)
                        .subscribe( data => {
                          setTimeout(() => {
                            // Check valid Password
                            // if (this._authService.checkCredential(data.email, this.inputForm.get("oldPassword").value)) {
                            this._userService.updatePassword(data.email, this.inputForm.get("oldPassword").value, this.inputForm.get("confirmPassword").value)
                              .subscribe(data => {
                                  alert("Congratulations. Update Password successfully!!!");
                                },
                                error => {
                                  alert("Your current Password is not correct. Please provide password again!!!");
                                  this.inputForm.reset();
                                }
                              );
                          });
                        });
          
        }
      }
    }
    else {
      alert("Confirm password is not correct. Please input your Password again");
      this.inputForm.reset();
    }
    
  }
}
