import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  adminProfile: FormGroup;
  constructor() { 
  }
  onSubmit() {
  }
  ngOnInit() {
    this.adminProfile = new FormGroup({
      email: new FormControl("adminFoody@gmail.com"),
      gender: new FormControl("Nữ"),
      lastname: new FormControl("Pham"),
      firstname: new FormControl("Tuan"),
      password: new FormControl("123456"),
      DOB: new FormControl("31/12/1990"),
      phone:new FormControl("0123456789"),
      address:new FormControl("33 Đường Hưng Hòa, Quận Bình Tân")
    });
  }

}
