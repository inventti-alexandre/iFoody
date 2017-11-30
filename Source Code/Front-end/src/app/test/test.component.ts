import { UserService } from './../shared/services/user.service';
import { IUser } from './../shared/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  results: IUser; // Test
  print: string;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.results = {"lastName":"Test Post",
    "firstName":"Test Post",
    "gender":"1",
    "email":"TestPost1@gmail.com",
    "password":"bleu",
    "birthday":"1996-05-20",
    "isAdmin":false,
    "hasStore" : false  
  };
    //this._userService.getUserById("52da82fd-f624-4260-8617-00759c715d08")
    //this._userService.signUp(this.results)
    this._userService.signIn("hoailinhtinh@gmail.com","8899");
  }

}
