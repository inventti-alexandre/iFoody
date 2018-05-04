import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';

@Component({
  selector: 'admin-store',
  templateUrl: './admin-store.component.html',
  styleUrls: ['./admin-store.component.scss'],
  
})
export class AdminStoreComponent implements OnInit {
  totalStores: number;
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
  constructor(private _authService: AuthService) { 
    this.totalStores = 0;
  }

  ngOnInit() {
    this._authService.getCountOfTotalStores()
      .subscribe(result => {
        console.log("Total Stores result", result);
        this.totalStores = result;
      });
    
    this._authService.getAllStores()
      .subscribe(data => {
        console.log('getAllStore Data return', data);
        this.listStore = [];
        this.listStore.push(data);
      });
  }

}
