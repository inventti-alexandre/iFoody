import { CurrencyPipe } from '@angular/common/src/pipes/number_pipe';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  name: string;
  price: number;
  constructor() { 
    this.name = "Cơm Tấm Hà Tiên";
    this.price = 25000;
  }

  ngOnInit() {
  }

}
