import { UserService } from './../../../shared/services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from './../../../shared/services/product.service';
import { Component, ElementRef, Input, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import * as apiUrl from '../../../constant/apiUrl';
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
  userIdKey: string;
  isFavorited = false;
  favoriteId: string;

  constructor(private _productService: ProductService, 
      private router: Router, 
      private route: ActivatedRoute,
      private _userService: UserService,
      private elRef:ElementRef,
      private zone:NgZone,
      private ref:ChangeDetectorRef
    ) {
        this.userIdKey = apiUrl.UserId;
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
    
    // Product is Favorited or not
    this._userService.getFavoriteList(localStorage.getItem(apiUrl.UserId))
        .subscribe(response => {
            response.forEach(element => {
              if(element.productId === this.productId) {
                this.favoriteId = element.id;
                console.log(element);
                // let Component know Change of properties and update. Same with ChangeDetectorRef
                setTimeout( () => this.isFavorited = true, 0); 
                return;
              }
            });
        });
  }


  addRemoveFavoriteItem() {
    console.log("addFavoriteItem works");
    console.log(this.isFavorited);

    // Insert Product to Favorite List
    if (this.isFavorited === false) {
      this._userService.InsertFavoriteProduct(localStorage.getItem(this.userIdKey), this.productId, null)
      .subscribe(response => {
          this.isFavorited = true;
      });
    }
    else {
      console.log("else works");
      console.log("in else: ",this.favoriteId);
      this._userService.deleteFavoriteItem(this.favoriteId)
        .subscribe(response => {
          setTimeout(() => this.isFavorited = false);
        });
    }
    
  }

}
