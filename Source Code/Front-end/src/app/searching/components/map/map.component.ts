import { ImageDomain } from './../../../constant/apiUrl';
import { forEach } from '@angular/router/src/utils/collection';
import { Http } from '@angular/http';
import { Component, OnInit, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StoreService } from '../../../shared/services/store.service';
declare var addressList;
declare var mainStoreImage;
declare var nameStore;
declare var priceStore;
declare var addressStore;
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
  imageDomain: any;

  constructor(private _storeService: StoreService) {
    this.imageDomain = ImageDomain;
  }
  ngOnInit() {
    console.log('onInit');
    addressList = [];
    this.getLocation();
  }
  ngOnChanges(changes: SimpleChanges) {
    // this.getLocation();
    console.log('onChange');
  }
  getLocation=()=>{
    this._storeService.GetLocationsByStoreIds(this.storeIds)
    .subscribe(response => {
        // let addressList = [];
        response.sort(function(a,b) {return (a.storeId > b.storeId ? 1 : ((b.storeId > a.storeId) ? -1 : 0));}); 
        console.log('new response ', response);
        response.forEach(function(item) {
          let latitude = item['latitude'];
          let longitude = item['longitude'];
          addressList.push({latitude: latitude, longitude: longitude});
        });
        this.storeIds.sort();
        // mapObject.getAddressList(addressList);
        this.initMap();
    });

  }

  initMap() {
    return mapObject.initMap1();
  }
}

