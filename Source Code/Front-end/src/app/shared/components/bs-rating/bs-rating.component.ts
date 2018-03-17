import { AfterViewInit, ElementRef, Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
declare var ratingObject: any;

@Component({
  selector: 'bs-rating',
  templateUrl: './bs-rating.component.html',
  styleUrls: ['./bs-rating.component.scss']
})
export class BsRatingComponent implements OnInit, AfterViewInit {
 
  @Input('rating') rating;  
  @Input('ratingCount') ratingCount: number;  
  @Input('id') id: any;

  public max = 5;
  public isReadonly = true;
  isGood: boolean; // for rating which greater than 4.5
  isFair: boolean; // "fair" for rating which greater than 4.0
  isMedium: boolean; // "medium" for rating which equal to or greater than 3.5
  isBad: boolean; // "bad" for rating which less than 3.5
 
  public overStar:number;
  // public percent:number;
  constructor (
      private elementRef: ElementRef,
      private _productService: ProductService, 
      private _http: Http, 
      private route: ActivatedRoute,
      private router: Router) {
    // this.ratingCount = 0;
    this.isGood = false;
    this.isFair = false;
    this.isMedium = false;
    this.isBad = false;
    this.getStatus();
  }

  ngOnInit() {
    this.ratingCount = (this.ratingCount > 0) ? this.ratingCount : 0;
  }
  
  ngAfterViewInit() {
    ratingObject.removeBorderLine();
  }

  public hoveringOver(value:number):void {
    this.overStar = value;
    // this.percent = 100 * (value / this.max);
  }

  getDetail() {
    console.log("getDetail works");
    if(this.id != null) {
      return this._productService.GetProductById(this.id.replace(/['"]+/g, ''))
        .subscribe((data: Response) => {
          this.router.navigate(['/product', this.id]);
        });
    }
    return null;
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
