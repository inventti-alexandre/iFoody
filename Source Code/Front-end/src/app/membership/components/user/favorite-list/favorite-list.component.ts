import { IFavoriteList } from './../../../../shared/models/favorite-list';
import { UserService } from '../../../../shared/services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { ProfileChildren } from '../../../models/profileChildren';
import * as apiUrl from '../../../../constant/apiUrl';

@Component({
  selector: 'favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit, ProfileChildren {
  favoriteList: IFavoriteList[];
  productIds: any[];
  storeIds: any[];

  notification: string;
  @Input() data: any;
  constructor(private _userService: UserService) {
  }

  ngOnInit() {
     // Get Favorite List from User Id in Local Storage
     this._userService.getFavoriteList(localStorage.getItem(apiUrl.UserId))
     .subscribe(data => {
       this.favoriteList = data;

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
}
