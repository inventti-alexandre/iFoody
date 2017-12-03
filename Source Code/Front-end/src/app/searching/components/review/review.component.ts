import { IReview } from './../../../shared/models/allModel';
import { UserService } from './../../../shared/services/user.service';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit{
  @Input() productId: string;
  reviewsModel: any[];
  reviewQuantity: number;
  userIds: string[];
  users: any[]; 

  // user = {
  //   name : "Tuan Pham"
  // };
  public max = 5;
  public rate;
  ratingNumber: number;
  public isReadonly = false;
 
  public overStar:number;
 
  public hoveringOver(value:number):void {
    this.overStar = value;
  }
  constructor(private _productService: ProductService, private _userService: UserService) { 
    // this.user.name = "Tuan Pham";
    this.rate = 4;
    console.log("constructor review");
  }
  
  ngOnInit() {
    this._productService.GetReviewListByProductId(this.productId)
      .subscribe(data => {
        console.log("Review OnInit works.");
        console.log(data);
        this.reviewsModel = data;
        this.reviewQuantity = this.reviewsModel.length;
      });
    
    }
}
