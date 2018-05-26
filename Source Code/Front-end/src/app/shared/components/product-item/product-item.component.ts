import { forEach } from '@angular/router/src/utils/collection';
import { imageDefault } from "./../../../constant/global";
import { ActivatedRoute, Router } from "@angular/router";
import { Http } from "@angular/http";
import { GetAllProduct } from "./../../../constant/apiUrl";
import { ProductService } from "./../../services/product.service";
import { UserService } from "./../../services/user.service";
import { IProductItem } from "../../models/allModel";
import { CurrencyPipe } from "@angular/common/src/pipes/number_pipe";
import { Component, OnInit, Output, Input } from "@angular/core";
import * as apiUrl from "../../../constant/apiUrl";
import { ImageDomain } from "../../../constant/apiUrl";
import { handelImgErro, checkOpenStore, enCodeUrl, handelImagePath } from "./../../../shared/services/share-function.service";

@Component({
  selector: "product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.css"]
})
export class ProductItemComponent implements OnInit {
  @Input() productId: string;
  @Input() productInfo: IProductItem;
  productModel: any;
  productUrl: string;
  imageDefault: string;
  imageDomain: any;
  handelImgErro = handelImgErro;
  checkOpenStore = checkOpenStore;
  enCodeUrl = enCodeUrl;
  handelImagePath = handelImagePath;
  constructor(
    private _productService: ProductService,
    private _http: Http,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productUrl = apiUrl.GetAllProduct;
    this.imageDefault = imageDefault;
    this.imageDomain = ImageDomain;
  }

  ngOnInit() {
    this.getProductInfo();
  }

  getProductInfo = () => {
    if (this.productId) {
      this._productService.GetProductById(this.productId).subscribe(data => {
        this.productModel = data;
        this.productModel.images = handelImagePath(this.productModel.images);
      });
    }
    if (this.productInfo) {
      this.productId = this.productInfo.product.id;
      this.productModel = this.productInfo;
      this.productModel.images = handelImagePath(this.productModel.images);
    }
    // this.productModel.images.forEach(image => {
    //   image.path = image.path.replace("~/", "");
    // });
  }

  getProductDetail() {
    if (this.productId != null) {
      return this._productService
        .GetProductById(this.productId.replace(/['"]+/g, ""))
        .subscribe((data: Response) => {
          this.router.navigate(["/product", encodeURI(this.productId)]);
        });
    }
    return null;
  }
}
