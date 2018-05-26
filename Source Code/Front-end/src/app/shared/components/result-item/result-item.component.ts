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
  handelImgErro = handelImgErro;
  checkOpenStore= checkOpenStore;
  enCodeUrl= enCodeUrl;
  handelImagePath;
  imageDefault: string;
  imageDomain: string;
  constructor() {
    this.imageDefault = imageDefault;
    this.imageDomain = ImageDomain;
    this.handelImagePath = handelImagePath;
  }

  ngOnInit() {
    this.getItemInfo();
  }
  getItemInfo = () => {
    this.item = this.itemInfo;
    this.item.images = handelImagePath(this.item.images);
  }
}
