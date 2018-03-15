import { AfterViewInit, ElementRef, Component, OnInit, Input } from '@angular/core';
declare var ratingObject: any;

@Component({
  selector: 'bs-rating',
  templateUrl: './bs-rating.component.html',
  styleUrls: ['./bs-rating.component.scss']
})
export class BsRatingComponent implements OnInit, AfterViewInit {
  @Input('rating') rating;  
  public max = 5;
  // public currentRate = 3.4;
  ratingNumber: number;
  public isReadonly = true;
  isGood: boolean; // for rating which greater than 4.5
  isFair: boolean; // "fair" for rating which greater than 4.0
  isMedium: boolean; // "medium" for rating which equal to or greater than 3.5
  isBad: boolean; // "bad" for rating which less than 3.5
 
  public overStar:number;
  // public percent:number;
  constructor (private elementRef: ElementRef) {
    // this.rating = 3.4;

    this.isGood = false;
    this.isFair = false;
    this.isMedium = false;
    this.isBad = false;
    this.ratingNumber = 33;
    this.getStatus();
  }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    ratingObject.removeBorderLine();
  }

  public hoveringOver(value:number):void {
    this.overStar = value;
    // this.percent = 100 * (value / this.max);
  }
 
  // public resetStar():void {
  //   this.overStar = void 0;
  // }
  
  // currentRate: number;
  // ratingNumber: number;
  // max = 5;
 
  
  

  // // modify variable for setting color to rating
  // private getStatus() {
  //   if (this.currentRate >= 4.5) {this.isGood = true;}
  //   else if (this.currentRate >= 4.0) {this.isFair = true;}
  //   else if (this.currentRate >= 3.5) {this.isMedium = true;}  
  //   else  {this.isBad = true;}
  // }
  private getStatus() {
    if (this.rating >= 4.5) {this.isGood = true;}
    else if (this.rating >= 4.0) {this.isFair = true;}
    else if (this.rating >= 3.5) {this.isMedium = true;}  
    else  {this.isBad = true;}
  }
}
