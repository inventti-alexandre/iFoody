import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  user: FormGroup;
  constructor() { }

  ngOnInit() {
    this.user = new FormGroup({
      oldPassword: new FormControl(),
      newPassword: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }

  onSubmit() {

  }
}
