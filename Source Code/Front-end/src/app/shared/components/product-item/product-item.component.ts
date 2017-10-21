import { Product } from '../../models/product';
import { CurrencyPipe } from '@angular/common/src/pipes/number_pipe';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  product: Product = new Product();
  // name: string;
  // price: number;
  constructor() { 
    this.product.id = "1234";
    this.product.name = "Cơm Tấm Hà Tiên";
    this.product.price = 25000;
  }

  ngOnInit() {
  }

}
  