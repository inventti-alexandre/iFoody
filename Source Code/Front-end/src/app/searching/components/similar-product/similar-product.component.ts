import { IProduct } from './../../../shared/models/allModel';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'similar-product',
  templateUrl: './similar-product.component.html',
  styleUrls: ['./similar-product.component.scss']
})
export class SimilarProductComponent implements OnInit {
  @Input() categoryId: string; 
  @Input() productId: string;
  similarProducts: any[];
  size = 20;

  constructor(private _productService: ProductService) { 
    console.log("similarProduct component works");
    console.log(this.categoryId);
  }

  ngOnInit() {
    this._productService.GetProductByCategoryId(this.categoryId)
                              .subscribe(data => {
                                console.log("similar");
                                console.log(data);
                                this.similarProducts = data;
                                if(this.similarProducts.length > 0) {
                                  let filterProductId = this.productId;
                                  this.similarProducts = this.similarProducts.filter(function(item) {
                                    if(item.product.id === filterProductId) {
                                      return false;
                                    }
                                    return true;
                                  }); 
                                  console.log(this.similarProducts);
                                  
                                  if (this.similarProducts.length < 20) {
                                    this.similarProducts.slice(0,this.similarProducts.length);
                                  }
                                  else {
                                    this.similarProducts.slice(0, 20);
                                  }
                                }
                              });
  }

}
