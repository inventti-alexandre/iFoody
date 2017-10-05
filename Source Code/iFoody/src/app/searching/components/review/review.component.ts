import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent{
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
