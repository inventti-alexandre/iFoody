import { forEach } from '@angular/router/src/utils/collection';
import { Http } from '@angular/http';
import { Component, OnInit, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StoreService } from '../../../shared/services/store.service';

declare var mapObject: any;

// declare var testObject: any;
// declare var myExtObject: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  @Input('storeIds') storeIds;

  constructor(private _storeService: StoreService) {
  }
  ngOnInit() {
    this.getLocation();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getLocation();
  }
  getLocation=()=>{
    this._storeService.GetLocationsByStoreIds(this.storeIds)
    .subscribe(response => {
        let addressList = [];
        response.forEach(function(item) {
          let latitude = item['latitude'];
          let longitude = item['longitude'];
          addressList.push({latitude: latitude, longitude: longitude});
        });
        mapObject.getAddressList(addressList);
        this.initMap();
    });
  }

  initMap() {
    return mapObject.initMap1();
  }
}

