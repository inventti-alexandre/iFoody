import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-store',
  templateUrl: './admin-store.component.html',
  styleUrls: ['./admin-store.component.scss'],
  
})
export class AdminStoreComponent implements OnInit {

  listStore = [
    {
      type:"Trà sữa"
    },
    {
      type:"Coffee"
    },
    {
      type: "Quán cơm"
    },
    {
      type: "Quán hủ tiếu"
    },
    {
      type: "Quán gà quay"
    },
    {
      type: "Lẩu hải sản"
    },
    {
      type: "Hot and cold"
    },
    {
      type: "Trà Ngọc quán"
    },
    {
      type: "Gà"
    },
    {
      type: "Quán cơm"
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
