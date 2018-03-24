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

  constructor(private _productService: ProductService, 
      private router: Router, 
      private route: ActivatedRoute,
      private _userService: UserService,
      private elRef:ElementRef,
      private zone:NgZone,
      private ref:ChangeDetectorRef
    ) {
        this.userIdKey = apiUrl.UserId;
        this.storeId = [];
   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productId = params["id"];
      this.getProductDetail();
    });
  }
  getProductDetail = () => {
    this._productService
      .GetProductById(this.productId)
      .subscribe((data: Response) => {
        this.productModel = data;
        console.log("productModel ", this.productModel);
        this.categoryId = this.productModel.category.id;
        console.log("categoryId", this.categoryId);
      });

    this._productService.GetProductById(this.productId)
    .subscribe((data: Response) => {
      this.productModel = data; 
      console.log('productModel ', this.productModel);
      this.categoryId = this.productModel.category.id;
      console.log('categoryId', this.categoryId);
      this.storeId.push(this.productModel.store.id);
      console.log(this.storeId);
    });

    // Product is Favorited or not
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
  };


  addFavoriteItem() {
    console.log("addFavoriteItem works");
    console.log(this.isFavorited);

    // Insert Product to Favorite List
    if (this.isFavorited === false) {
      // this._userService.InsertFavoriteProduct(localStorage.getItem(this.userIdKey), this.productId, null)
      let userId = localStorage.getItem(this.userIdKey);
      let storeIdLocal = (this.productId != null) ? null: this.storeId; // Just Get either Product or Store Id
      let model = {'userId':userId.replace(/['"]+/g,''), 'productId': this.productId, 'storeId': storeIdLocal};
      console.log(model);
      this._userService.InsertFavoriteProduct(model)
      .subscribe(response => {
          console.log("response", response);
          this.isFavorited = true;
          alert("Thêm mục yêu thích thành công!");
          console.log(this.isFavorited);
      });
    }
    else {
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
