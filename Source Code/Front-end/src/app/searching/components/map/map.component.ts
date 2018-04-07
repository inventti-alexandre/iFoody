import { forEach } from '@angular/router/src/utils/collection';
import { Http } from '@angular/http';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { StoreService } from '../../../shared/services/store.service';

declare var mapObject: any;

// declare var testObject: any;
// declare var myExtObject: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input('storeIds') storeIds;

  constructor(private _storeService: StoreService) {
    // this.storeIds = [
    //   '6c613d63-5c70-4aec-b224-104ad02751b4',
    //   'f6d69b54-0001-45e9-8c40-132f57e70a28',
    //   '7f5a7217-2b62-4c03-b031-3111b8060fcd',
    //   '79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c'
    // ];



    // // this.storeIds.forEach(element => {
    //   console.log(element);
    //   element = `${"storeId:"} ${element}`; // In TypeSrcipt
    //   encodedStoreIds.push(btoa(element.replace(/\s/g, '')));
    // });
    // this.storeIds.forEach(element => {
    //   console.log(element);
    //   element = `${"storeId:"} ${element}`; // In TypeSrcipt
    //   encodedStoreIds.push(btoa(element.replace(/\s/g, '')));
    // });
    // console.log(encodedStoreIds);


  }
  ngOnInit() {
    this.getLocation();
  }
  getLocation=()=>{
    this._storeService.GetLocationsByStoreIds(this.storeIds)
    .subscribe(response => {
        let addressList = [];
        response.forEach(function(item) {
          let latitude = item['latitude'];
          let longitude = item['longitude'];
          console.log(latitude);
          console.log(longitude);
          addressList.push({latitude: latitude, longitude: longitude});
          console.log('addressList ne: ', addressList);
        });
        mapObject.getAddressList(addressList);
        this.initMap();
    });
  }

  initMap() {
    console.log("initMap works");
    // let addressList = [{
    //   id:null,
    //   address: "268 Lý Thường Kiệt"
    // },
    // {
    //   id: null,
    //   address: "165 Lý Thái Tổ"
    // }
  // ];
    // mapObject.getAddressList(this.addressList);
    return mapObject.initMap1();
  }
}

