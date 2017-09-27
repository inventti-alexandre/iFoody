import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'representative-product',
  templateUrl: './representative-product.component.html',
  styleUrls: ['./representative-product.component.scss']
})
export class RepresentativeProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  listProducts = [
    {
      name: "Coffee",

    },
    {
      name: "Trà sữa",
    },
    {
      name: "Sản phẩm đề xuất",
    }
  ]
}
