import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'similar-store',
  templateUrl: './similar-store.component.html',
  styleUrls: ['./similar-store.component.scss']
})
export class SimilarStoreComponent {
  user = {
    name : "Tuan Pham"
  };
  public max = 5;
  public rate;
  ratingNumber: number;
  public isReadonly = false;
 
  public overStar:number;
 
  public hoveringOver(value:number):void {
    this.overStar = value;
  }
  constructor() { 
    this.user.name = "Tuan Pham";
    this.rate = 4;
  }
}
