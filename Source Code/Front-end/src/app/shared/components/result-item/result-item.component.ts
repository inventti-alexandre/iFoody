import { imageDefault } from './../../../constant/global';
import { ICategory,IStore,IProduct,IImages } from './../../models/allModel';
import { Component, OnInit, Input} from "@angular/core";

@Component({
  selector: "result-item",
  templateUrl: "./result-item.component.html",
  styleUrls: ["./result-item.component.scss"]
})
export class ResultItemComponent implements OnInit {
  @Input("itemInfo") itemInfo;
  category:ICategory;
  store: IStore;
  product: IProduct;
  images: IImages[];
  imageDefault: string;
  constructor() {
    this.imageDefault = imageDefault;
  }

  ngOnInit() {
    this.getItemInfo();
  }
  getItemInfo = () => {
    this.category = this.itemInfo.category;
    this.store = this.itemInfo.store;
    this.product = this.itemInfo.product;
    this.images = this.itemInfo.images;
    console.log("item info is:", this.images.length);
  };
}
