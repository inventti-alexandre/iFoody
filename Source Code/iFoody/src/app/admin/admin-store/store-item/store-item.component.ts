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
  types = [
    {value: 'drink-1', viewValue: 'Trà sữa'},
    {value: 'food-2', viewValue: 'Bún bò'},
    {value: 'drink-3', viewValue: 'Coffee'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
