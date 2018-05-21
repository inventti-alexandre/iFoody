import { Headers } from "@angular/http";
import { UserService } from "./../../../shared/services/user.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { StoreService } from "./../../../shared/services/store.service";
import { Component, OnInit, Output } from "@angular/core";
import { ImageDomain } from "../../../constant/apiUrl";
import { imageDefault } from "./../../../constant/global";
import {
  deCodeUrl,
  handelImgErro
} from "../../../shared/services/share-function.service";
declare var deleteImageObject: any;
declare var mainStoreImage: any;
declare var nameStore: any;
declare var addressStore: any;

@Component({
  selector: "store-detail",
  templateUrl: "./store-detail.component.html",
  styleUrls: ["./store-detail.component.scss"]
})
export class StoreDetailComponent implements OnInit {
  storeManager = false;
  storeId;
  storeIds: any[];
  @Output() productModel: any;
  storeInfoModel: any;
  reviewList: any;
  imageDefault: any;
  imageDomain: any;
  deCodeUrl = deCodeUrl;
  isLoadingStore: Boolean;
  isLoadingProducts: Boolean;
  isLoadingReview: Boolean;
  handelImgErro = handelImgErro;
  productsQuantity: any;

  constructor(
    private _storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService
  ) {
    window.scrollTo(0, 0);
    this.imageDefault = imageDefault;
    this.imageDomain = ImageDomain;
    nameStore = 'No Name';
    addressStore = 'No update';
    this.productsQuantity = 0;
    this.storeInfoModel = {
      address: "...................",
      categoryId: "...................",
      city: "...................",
      closeHour: "...................",
      description: "...................",
      district: "...................",
      highestPrice: "...................",
      images: [],
      lowestPrice: "...................",
      name: "...................",
      openHour: "...................",
      rating: 0,
      ratingCount: 0
    };
    this.isLoadingStore = true;
    this.isLoadingReview = true;
    this.isLoadingProducts = true;
  }

  ngOnInit() {
    this.getStoreInfo();
  }
  getStoreInfo = () => {
    this.route.params.subscribe((params: Params) => {
      this.isLoadingStore = true;
      this.isLoadingReview = true;
      this.isLoadingProducts = true;

      let idFromParam = deCodeUrl(params["id"]);
      this.storeIds = [idFromParam]; // For Google Map Api
      this.storeId = idFromParam;
      this.reviewList = [];

      this._storeService.GetStoreById(idFromParam).subscribe(data => {
        console.log("storeInfoModel", data);
        this.storeInfoModel = data;
        this.isLoadingStore = false;
        
        this.storeInfoModel.images.forEach(image => {
          console.log('image path ', image);
          image.path = image.path.replace("~/", "");
         });

        if(localStorage.getItem("user_id") !== undefined && localStorage.getItem("user_id") !==  null) {
          if (
            data.userId === localStorage.getItem("user_id").replace(/['"]+/g, "")
          ) {
            this.storeManager = true;
            console.log("is Store Manager");
          }
          else {
            this.storeManager = false;
            console.log("not Store Manager");
          }
        } else {
            this.storeManager = false;
            console.log("is Guest");
        }

        if(this.storeInfoModel.images.length > 0) {
            mainStoreImage = [];
            mainStoreImage.push(this.imageDomain + this.storeInfoModel.images[0].path);
            console.log('mainStoreImage', mainStoreImage);
        }
        else {
          mainStoreImage = [];
          mainStoreImage.push(this.imageDefault);
          console.log('mainStoreImage', mainStoreImage);
        }
        
        if(this.storeInfoModel.city === '1'){
          this.storeInfoModel.city = 'TpHCM'
        }
        if(this.storeInfoModel.city === '2'){
          this.storeInfoModel.city = 'Hà Nội'
        }
        if(this.storeInfoModel != null && this.storeInfoModel.images.length > 0) {
          nameStore = this.storeInfoModel.name;
          addressStore = this.storeInfoModel.address + ', ' + this.storeInfoModel.district;
        }
        else {
          nameStore = "Cửa hàng";
          addressStore = "";
        }

        this._userService
          .getAllProductInStore(idFromParam)
          .subscribe((result: Response) => {
            console.log("data return from GetALlProductInStore: ", result);
            if (result.status === 404) {
              this.productModel = [];
            } else {
              this.productModel = result;
            }
            this.isLoadingProducts = false;
          });

        this._storeService
          .GetReviewListByStoreId(idFromParam)
          .subscribe(result => {
            console.log("data return from getReviewListByStoreId: ", result);
            this.reviewList = result;
            this.isLoadingReview = false;
            console.log("reviewList", this.reviewList);
          });
      });
    });
  }
}
