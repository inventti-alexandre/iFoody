import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: FormGroup;

  constructor() { }

  applyTheme(pop: any) {
    setTimeout(() => {
      pop.show();
    });
  }

  ngOnInit() {
      this.user = new FormGroup({
        email: new FormControl(),
        gender: new FormControl(),
        lastname: new FormControl(),
        firstname: new FormControl(),
        password: new FormControl(),
        confirmPassword: new FormControl(),
        DOB: new FormControl(),
      });
  }

  onSubmit() {
  }

}

