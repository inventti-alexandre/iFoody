import { ProfileChildren } from './../../../models/profileChildren';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, ProfileChildren {
  user: FormGroup;
  @Input() data: any;
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
