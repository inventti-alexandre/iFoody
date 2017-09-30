import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  // @Input('email') email = "adminFoody@gmail.com";
  fname:string = "Tuan";
  lname:string = "Pham";
  email:string = "adminFoody@gmail.com";
  pass = "123456";
  log(){
    console.log("email" + this.email);
  }
  constructor() { 

  }

  ngOnInit() {
  }
 
}
