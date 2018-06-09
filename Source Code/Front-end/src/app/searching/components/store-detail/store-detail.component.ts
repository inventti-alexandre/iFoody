import { Headers } from "@angular/http";
import { UserService } from "./../../../shared/services/user.service";
import { CategoryService } from "./../../../shared/services/category.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { StoreService } from "./../../../shared/services/store.service";
import { Component, OnInit, Output } from "@angular/core";
import { ImageDomain } from "../../../constant/apiUrl";
import { imageDefault } from "./../../../constant/global";
import {
  deCodeUrl,
  handelImgErro,
  handelImagePath
} from "../../../shared/services/share-function.service";
import * as apiUrl from "../../../constant/apiUrl";

declare var addressList: any;
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
  categoryName: any;
  isFavorited = false;
  favoriteId: string;

  constructor(
    private _storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    window.scrollTo(0, 0);
    this.imageDefault = imageDefault;
    this.imageDomain = ImageDomain;
    nameStore = [];
    addressStore = [];
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
    this.categoryName = '';
  }

  ngOnInit() {
    addressList = [];
    this.getStoreInfo();
    if(localStorage.getItem(apiUrl.UserId) !== null && localStorage.getItem(apiUrl.UserId) !== '') {
      this._userService
        .getFavoriteList(localStorage.getItem(apiUrl.UserId))
        .subscribe(response => {
          response.forEach(element => {
            if (element.storeId === this.storeId) {
              this.favoriteId = element.id;
              console.log("favoriteList: ", element);
              // let Component know Change of properties and update. Same with ChangeDetectorRef
              setTimeout(() => (this.isFavorited = true), 0);
              return;
            }
          });
        });
    }
  }
  getStoreInfo = () => {
    this.route.params.subscribe((params: Params) => {
      this.isLoadingStore = true;
      this.isLoadingReview = true;
      this.isLoadingProducts = true;

      let idFromParam = deCodeUrl(params["id"]);
      console.log(idFromParam);
      this.storeIds = [idFromParam]; // For Google Map Api
      this.storeId = idFromParam;
      this.reviewList = [];

      this._storeService.GetStoreById(idFromParam).subscribe(data => {
        console.log("storeInfoModel", data);
        this.storeInfoModel = data;
        this.isLoadingStore = false;

        this.storeInfoModel.images = handelImagePath(this.storeInfoModel.images);

          this._categoryService.GetCategoryById(this.storeInfoModel.categoryId)
            .subscribe(data => {
              console.log('data response from GetCategoryById ', data);
              this.categoryName = data.name;
            })
        if(localStorage.getItem("user_id") !== '' && localStorage.getItem("user_id") !==  null) {
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
            mainStoreImage.push(this.storeInfoModel.images[0].path);
            console.log('mainStoreImage', mainStoreImage);
        }
        else {
          mainStoreImage = [];
          mainStoreImage.push(this.imageDefault);
          console.log('mainStoreImage', mainStoreImage);
        }

        if(this.storeInfoModel.city === '1'){
          this.storeInfoModel.city = 'TpHCM';
        }
        if(this.storeInfoModel.city === '2'){
          this.storeInfoModel.city = 'Hà Nội';
        }
        if(this.storeInfoModel != null && this.storeInfoModel.images.length > 0) {
          nameStore.push(this.storeInfoModel.name);
          addressStore.push(this.storeInfoModel.address + ', ' + this.storeInfoModel.district);
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

  addFavoriteItem() {
    console.log("addFavoriteItem works");
    console.log(this.isFavorited);
    if(localStorage.getItem(apiUrl.UserId) === null ||
    localStorage.getItem(apiUrl.UserId) === undefined
    ) {
      alert('Đăng nhập để thêm vào mục yêu thích!');
      return true;
    }
    // Insert Product to Favorite List
    if (this.isFavorited === false) {
      // this._userService.InsertFavoriteProduct(localStorage.getItem(this.userIdKey), this.productId, null)
      let userId = localStorage.getItem(apiUrl.UserId);
      let model = {
        userId: userId.replace(/['"]+/g, ""),
        productId: null,
        storeId: this.storeId
      };
      console.log(model);
      this._userService.InsertFavoriteProduct(model).subscribe(response => {
        console.log("response", response);
        this.isFavorited = true;
        alert("Thêm mục yêu thích thành công!");
        console.log(this.isFavorited);
      });
    } else {
      console.log("else works");
      alert("Đã tồn tại trong mục yêu thích");
      // console.log("in else: ",this.favoriteId);
      // this._userService.deleteFavoriteItem(this.favoriteId)
      //   .subscribe(response => {
      //     setTimeout(() => this.isFavorited = false);
      //   });
    }
  }
}
