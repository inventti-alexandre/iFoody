import { Component, OnInit, ElementRef } from '@angular/core';
import '../../../../assets/lib/myMap.js';

// import '../../../../assets/lib/map';
declare var mapObject: any;

// declare var testObject: any;
// declare var myExtObject: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;
  
  constructor() {
  }
  ngOnInit() {
    this.initMap();
  }
  
  initMap() {
    console.log("initMap works");
    let addressList = [{
      id:null,
      address: "268 Lý Thường Kiệt"
    },
    {
      id: null,
      address: "165 Lý Thái Tổ"
    }
  ];
    mapObject.getAddressList(addressList);
    return mapObject.initMap1();
  }
}

