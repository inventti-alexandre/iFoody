import { ProfileChildren } from './../../../models/profileChildren';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit,ProfileChildren {
  user: FormGroup;
  @Input() data: any;
  
  constructor() { }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl()
    });
  }

  onSubmit() {

  }

}
