import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  results: any;
  addressList: string[]; // To get string Address List, like  ['268 Le Lai', '192 Ly Thai To']
  constructor(private _productService: ProductService) {
     this.results = this._productService.GetAll()
        .subscribe(response => {
          this.results = response;
        });
   }

  ngOnInit() {
  }


}
