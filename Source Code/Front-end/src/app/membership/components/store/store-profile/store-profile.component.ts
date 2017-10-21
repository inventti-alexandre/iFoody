import { ProfileChildren } from '../../../models/profileChildren';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '../../../../shared/models/store';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.scss']
})
export class StoreProfileComponent implements OnInit, ProfileChildren {

  store;
  @Input() data: any;

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
