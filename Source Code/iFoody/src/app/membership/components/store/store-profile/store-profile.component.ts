import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '../../../../shared/models/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.scss']
})
export class StoreProfileComponent implements OnInit {

  store;

  constructor() { }

  ngOnInit() {
    this.store = new FormGroup({
      email: new FormControl(),
      gender: new FormControl(),
      lastname: new FormControl(),
      firstname: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      DOB: new FormControl(),
    });
  }

}
