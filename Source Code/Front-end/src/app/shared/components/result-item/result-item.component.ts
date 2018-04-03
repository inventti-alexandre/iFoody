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
  images: IImages;
  constructor() {}

  ngOnInit() {
    this.test();
  }
  test = () => {
    console.log("item info is:", this.itemInfo);
    this.category = this.itemInfo.category;
    this.store = this.itemInfo.store;
    this.product = this.itemInfo.product;
    this.images = this.itemInfo.images;
  }
}
