import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'store-detail-info',
  templateUrl: './store-detail-info.component.html',
  styleUrls: ['./store-detail-info.component.scss']
})
export class StoreDetailInfoComponent implements OnInit {
  @Input() storeModel;
  
  constructor() { }

  ngOnInit() {
  }

}
