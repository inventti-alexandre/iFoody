import { ISearchResult } from './../../models/allModel';
import { Component, OnInit, Input} from "@angular/core";
import { handelImgErro,checkOpenStore } from "../../../shared/services/share-function.service";

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
  constructor() {
  }

  ngOnInit() {
    this.getItemInfo();
  }
  getItemInfo = () => {
    this.item = this.itemInfo;
  };
}
