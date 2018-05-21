import { ImageDomain } from './../../../constant/apiUrl';
import { ISearchResult } from './../../models/allModel';
import { Component, OnInit, Input} from "@angular/core";
import { handelImgErro, checkOpenStore, enCodeUrl, handelImagePath } from "../../../shared/services/share-function.service";
import { imageDefault } from "../../../constant/global";

@Component({
  selector: "result-item",
  templateUrl: "./result-item.component.html",
  styleUrls: ["./result-item.component.scss"]
})
export class ResultItemComponent implements OnInit {
  @Input("itemInfo") itemInfo;
  item:ISearchResult;
  imageDefault = imageDefault;
  handelImgErro = handelImgErro;
  checkOpenStore= checkOpenStore;
  enCodeUrl= enCodeUrl;
  handelImagePath = handelImagePath;
  imageDefault: any;
  imageDomain: any;
  constructor() {
    this.imageDefault = imageDefault;
    this.imageDomain = ImageDomain;
  }

  ngOnInit() {
    this.getItemInfo();
  }
  getItemInfo = () => {
    this.item = this.itemInfo;
    this.item.images = handelImagePath(this.item.images);
  }
}
