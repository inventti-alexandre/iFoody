import { ImageDomain } from './../../../constant/apiUrl';
import { UserService } from "./../../../shared/services/user.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { ProductService } from "./../../../shared/services/product.service";
import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  ChangeDetectorRef
} from "@angular/core";
import * as apiUrl from "../../../constant/apiUrl";
declare var mainStoreImage: any;
declare var nameStore: any;
declare var addressStore: any;

import { deCodeUrl, handelImagePath } from "./../../../shared/services/share-function.service";
@Component({
  selector: "product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  productId;
  productModel: any;
  categoryId: string;
  storeId: any;
  reviews: any[];
  ratingCount: number;
  userIdKey: string;
  isFavorited = false;
  favoriteId: string;
  imageDefault: string;
  imageDomain: string;
  deCodeUrl = deCodeUrl;
  isLoadingProduct: Boolean;
  handelImagePath =handelImagePath;

  constructor(
    private _productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService,
    private elRef: ElementRef,
    private zone: NgZone,
    private ref: ChangeDetectorRef
  ) {
    this.userIdKey = apiUrl.UserId;
    this.storeId = [];
    this.isLoadingProduct = true;
    this.imageDomain = ImageDomain;
    nameStore = [];
    addressStore = [];
  }

  ngOnInit() {
    this.getProductDetail();
  }
  getProductDetail = () => {
    this.route.params.subscribe((params: Params) => {
      this.productId = deCodeUrl(params["id"]);
      this.isLoadingProduct = true;

      this._productService
        .GetProductById(this.productId)
        .subscribe((data: Response) => {
          console.log('TTTTTTTTTTTTTT: ', data);
          this.productModel = data;
          this.productModel.images = handelImagePath(this.productModel.images);
          if(this.productModel.store.city === '1'){
            this.productModel.store.city = 'TpHCM';
          }
          if(this.productModel.store.city === '2'){
            this.productModel.store.city = 'Hà Nội';
          }
          this.isLoadingProduct = false;
          this.categoryId = this.productModel.category.id;
          this.storeId.push(this.productModel.store.id);
          if(this.productModel.images.length > 0) {
            mainStoreImage = [];
            mainStoreImage.push(this.productModel.images[0].path);
          }
          else {
            mainStoreImage = [];
            mainStoreImage.push(this.imageDefault);
          }
          nameStore.push(this.productModel.store.name);
          addressStore.push(this.productModel.store.address + ', ' + this.productModel.store.district);
          
        });

      // Product is Favorited or not
      if(localStorage.getItem(apiUrl.UserId) !== null && localStorage.getItem(apiUrl.UserId) !== '') {
        this._userService
          .getFavoriteList(localStorage.getItem(apiUrl.UserId))
          .subscribe(response => {
            response.forEach(element => {
              if (element.productId === this.productId) {
                this.favoriteId = element.id;
                console.log("favoriteList: ", element);
                // let Component know Change of properties and update. Same with ChangeDetectorRef
                setTimeout(() => (this.isFavorited = true), 0);
                return;
              }
            });
          });
      }
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
      let userId = localStorage.getItem(this.userIdKey);
      let storeIdLocal = this.productId != null ? null : this.storeId; // Just Get either Product or Store Id
      let model = {
        userId: userId.replace(/['"]+/g, ""),
        productId: this.productId,
        storeId: storeIdLocal
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
