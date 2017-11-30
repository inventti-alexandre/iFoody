import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http } from '@angular/http';

@Component({
  selector: 'representative-product',
  templateUrl: './representative-product.component.html',
  styleUrls: ['./representative-product.component.scss'],
  providers: [ProductService]
})
export class RepresentativeProductComponent implements OnInit {
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
  ];
  
  public values: any[];
  constructor(private _dataService: ProductService) {}
  ngOnInit() {
    this._dataService
        .GetAll()
        .subscribe(data => this.values = data,
        );
  }

  
}
