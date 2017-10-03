import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss']
})
export class StoreItemComponent implements OnInit {
  
  avatar="http://lorempixel.com/50/50/cats/";
  name="Trà sữa Mộc";
  address = "22 Bửu Long Quận 10 Hồ Chí Minh";
  type = "Trà sữa";
  
  constructor() { }

  ngOnInit() {
  }

}
