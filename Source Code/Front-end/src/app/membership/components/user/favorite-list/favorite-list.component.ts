import { IFavoriteList } from './../../../../shared/models/allModel';
import { UserService } from '../../../../shared/services/user.service';
import { Component, OnInit, Input, AfterViewChecked, AfterViewInit, ViewChild, ViewChildren, 
  ElementRef, AfterContentInit } from '@angular/core';
import { ProfileChildren } from '../../../models/profileChildren';
import * as apiUrl from '../../../../constant/apiUrl';

@Component({
  selector: 'favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit, ProfileChildren, AfterViewChecked, AfterContentInit {
  favoriteList: IFavoriteList[];
  productIds: any[];
  storeIds: any[];
  @ViewChildren('deleteIcon') deleteIcon; 

  notification: string;
  @Input() data: any;
  constructor(private _userService: UserService,private elRef:ElementRef) {
  }

  ngOnInit() {
     // Get Favorite List from User Id in Local Storage
     this._userService.getFavoriteList(localStorage.getItem(apiUrl.UserId))
     .subscribe(data => {
       this.favoriteList = data;
      console.log('data',data);
       // Filter Product or Store from favoriteList variable
       this.productIds= this.favoriteList
       .filter(function(x: IFavoriteList) {
           /// console.log(this.favoriteList);
           return x.productId != null;
         })
       .map(y => y.productId);
       
       this.storeIds = this.favoriteList
       .filter(function(y: IFavoriteList) {
        return y.storeId != null ;
      })
      .map(y => y.storeId);
     });
  }

  ngAfterViewChecked() {
  }

  ngAfterContentInit() {
    console.log("ngafterContentInit");
    console.log(this.elRef.nativeElement.querySelector("div"));
    console.log("OK");
  }
}
