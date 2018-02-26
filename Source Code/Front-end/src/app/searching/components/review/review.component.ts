import { ActivatedRoute, Router } from '@angular/router';
import { IReview, IUser, IProduct } from './../../../shared/models/allModel';
import { UserService } from './../../../shared/services/user.service';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import * as apiUrl from '../../../constant/apiUrl';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit{
  rerender = false; // Refresh component when submit Review
  @Input() productId: string;
  reviewsModel: any[];
  reviewQuantity: number;
  currentUserId: string;
  currentUser: IUser;
  newRate: number;
  today: any;
  newReviewContent: string;

  public max = 5;
  public rate;
  public isReadonly: boolean;
 
  public overStar:number;

  constructor(private _productService: ProductService, 
      private _userService: UserService,
      private datePipe: DatePipe,
      private cdRef:ChangeDetectorRef,
      private router: Router,
      private activatedRoute: ActivatedRoute) 
    { 
      this.isReadonly = false;
      this.today = new Date(Date.now());
      this.currentUserId = localStorage.getItem(apiUrl.UserId);
    }
  
  ngOnInit() {
    this.getReviewsData();
    this._userService.getUserById(this.currentUserId)
      .subscribe(data => {
        this.currentUser = data;
      });
    
  }

  public hoveringOver(value:number):void {
    this.newRate = value;
  }
  
  onSubmit() {
    if(this.newRate === undefined || this.newRate <= 1) {
      this.newRate = 1;
    }

    let newReview: IReview = {
        reviewContent: this.newReviewContent,
        rating:this.newRate,
        date: this.today,
        userId: this.currentUserId.replace(/['"]+/g, ''),
        productId: this.productId,
        storeId: null
    };
    console.log(newReview);
    this._userService.insertReview(newReview)
      .subscribe((response: Response) => {
        this.getReviewsData();
        this.newReviewContent = null;
        this.newRate = 0;
      });
  }

  getReviewsData() {
    this._productService.GetReviewListByProductId(this.productId)
      .subscribe(data => {
        this.reviewsModel = data;
        this.reviewQuantity = this.reviewsModel.length;
      });
  
  }
}
