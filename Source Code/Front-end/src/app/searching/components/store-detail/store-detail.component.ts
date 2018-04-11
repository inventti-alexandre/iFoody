import { UserService } from './../../../shared/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StoreService } from './../../../shared/services/store.service';
import { Component, OnInit, Output } from '@angular/core';
import { ImageDomain } from '../../../constant/apiUrl';
import { imageDefault } from './../../../constant/global';
declare var deleteImageObject: any;

@Component({
  selector: 'store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {
  storeManager = true;
  storeId;
  storeIds: any[];
  @Output() productModel: any;
  storeInfoModel: any;
  reviewList: any;
  imageDefault: any;
  imageDomain:any;

  constructor(
    private _storeService: StoreService, 
    private router: Router, 
    private route: ActivatedRoute,
    private _userService: UserService
    ) {
    window.scrollTo(0,0);
    this.imageDefault = imageDefault;
    this.imageDomain = ImageDomain;
    this.storeInfoModel = {
      address: "...................",
      categoryId: "...................",
      city:"...................",
      closeHour:"...................",
      description:"...................",
      district:"...................",
      highestPrice:"...................",
      images:[],
      lowestPrice:"...................",
      name:"...................",
      openHour:"...................",
      rating:0,
      ratingCount:0
    };

    this.route.params.subscribe((params: Params) => {

      this.storeIds = [params['id']]; // For Google Map Api
      this.storeId = params['id'];
      this.reviewList = [];

      console.log("in params");
      this._storeService.GetStoreById(params['id'])
        .subscribe(data => {
          console.log("storeInfoModel", data);
          this.storeInfoModel = data;
          if(data.userId === localStorage.getItem('user_id').replace(/['"]+/g, '')) {
            console.log("is Store Manager");
          }
          else {
            this.storeManager = false;
            console.log('not Store Manager');
          }
          this.storeInfoModel.images.forEach(image => {
            image.path = image.path.replace('~/','');
          });

          this._userService.getAllProductInStore(params['id'])
            .subscribe(result => {
              console.log("data return from GetALlProductInStore: ", result);
              this.productModel = result;
            },
            error => {
              console.log(error);
            });
          
          this._storeService.GetReviewListByStoreId(params['id'])
            .subscribe(result => {
              console.log("data return from getReviewListByStoreId: ", result);
              this.reviewList.push(result);
              console.log('reviewList', this.reviewList);
            });
        });

      
      

      });

   }

  ngOnInit() {
    
  }
}
