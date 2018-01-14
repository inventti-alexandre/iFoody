import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  hasIndex = false;
  avatar="http://lorempixel.com/50/50/cats/";
  name="Meo Nguyen";
  email="meonguyen@gmail.com";
  day = "22/12/2017";
  @Input('index') index: string;
  @Input('user') user: string;
  constructor() { 
    if(this.index !== '') {
      this.hasIndex = true;
    }
  }

  ngOnInit() {
    console.log(this.user);
  }

}
