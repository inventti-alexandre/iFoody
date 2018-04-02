import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'store-detail-info',
  templateUrl: './store-detail-info.component.html',
  styleUrls: ['./store-detail-info.component.scss']
})
export class StoreDetailInfoComponent implements OnInit, AfterViewChecked {
  @Input() storeModel;
  
  constructor() { 
  }

  ngOnInit() {
    console.log('storeModel', this.storeModel);
  }
  ngAfterViewChecked() {
  }
}
