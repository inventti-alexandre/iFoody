import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  results: any;
  constructor(private _productService: ProductService) {
     this.results = this._productService.GetAll()
        .subscribe(response => {
          console.log("get ALL works");
          console.log(response);
          this.results = response;
        });
   }

  ngOnInit() {
  }


}
