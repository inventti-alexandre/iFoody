import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  user: FormGroup;
  constructor() { }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl()
    });
  }

  onSubmit() {

  }

}
