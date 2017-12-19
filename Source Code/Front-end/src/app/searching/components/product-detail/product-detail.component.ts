import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId;
  productModel: any;
  categoryId: string;
  reviews: any[];

  constructor(private _productService: ProductService, private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['id'];
      console.log(this.productId);
    });

    this._productService.GetProductById(this.productId)
    .subscribe((data: Response) => {
      console.log(data);
      this.productModel = data; 
      this.categoryId = this.productModel.category.id;
      console.log( this.categoryId);
    });

    // get ReviewId array from Product
    this._productService.GetReviewListByProductId(this.productId)
        .subscribe(data => {
          console.log("GetReviewListbyProductId works");
          this.reviews = data;
          console.log(this.reviews);
        });
  }

}
