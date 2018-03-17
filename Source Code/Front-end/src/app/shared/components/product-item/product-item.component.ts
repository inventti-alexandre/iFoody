import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { GetAllProduct } from './../../../constant/apiUrl';
import { ProductService } from './../../services/product.service';
import { UserService } from './../../services/user.service';
import { IProduct } from '../../models/allModel';
import { CurrencyPipe } from '@angular/common/src/pipes/number_pipe';
import { Component, OnInit, Output, Input } from '@angular/core';
import * as apiUrl from '../../../constant/apiUrl';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  // @Output() product: IProduct;
  @Input() productId: string;
  productModel: any;
  productUrl: string;
  // name: string;
  // price: number;
  constructor(private _productService: ProductService, 
            private _http: Http, 
            private route: ActivatedRoute,
            private router: Router
          ) { 
   this.productUrl = apiUrl.GetAllProduct;
    // this.product.id = "abcde";
    // this.product.name = "Cơm Tấm Hà Tiên";
    // this.product.price = 25000;
  }

  ngOnInit() {
    this._productService.GetProductById(this.productId)
      .subscribe(data =>{
          this.productModel = data;
        });
  }

  getProductDetail() {
    console.log("getProductDetail works");
    if(this.productId != null) {
      return this._productService.GetProductById(this.productId.replace(/['"]+/g, ''))
        .subscribe((data: Response) => {
          this.router.navigate(['/product', this.productId]);
        });
    }
    return null;
  }

}
