import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-product-item',
  templateUrl: './admin-product-item.component.html',
  styleUrls: ['./admin-product-item.component.scss']
})
export class AdminProductItemComponent implements OnInit {
  @Input("productInfo") productInfo;
  @Input("index") index;
  types = [
    {value: 'drink-1', viewValue: 'Trà sữa'},
    {value: 'food-2', viewValue: 'Bún bò'},
    {value: 'drink-3', viewValue: 'Coffee'}
  ];
  isSmallDesktop=false;
  constructor() { 
    this.onLoad();
  }
  checkIsSmallDesktop(width){
    if(width<=991){
      return true;
    }else {
      return false;
    }
  }
  
  onResize(event) {
    let innerWidth = event.target.innerWidth;
    this.isSmallDesktop = this.checkIsSmallDesktop(innerWidth);
    return;
  }
  onLoad(){
    let innerWidth = window.innerWidth;
    this.isSmallDesktop = this.checkIsSmallDesktop(innerWidth);
    return;
  }
  ngOnInit() {
  }

}
