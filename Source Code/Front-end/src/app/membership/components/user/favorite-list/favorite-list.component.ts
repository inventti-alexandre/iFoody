import { forEach } from '@angular/router/src/utils/collection';
import { imageDefault } from './../../../../constant/global';
import { IFavoriteList } from './../../../../shared/models/allModel';
import { UserService } from '../../../../shared/services/user.service';
import { Component, OnInit, Input, AfterViewChecked, AfterViewInit, ViewChild, ViewChildren, 
  ElementRef, AfterContentInit } from '@angular/core';
import { ProfileChildren } from '../../../models/profileChildren';
import * as apiUrl from '../../../../constant/apiUrl';
import { ProductService } from '../../../../shared/services/product.service';
import { StoreService } from '../../../../shared/services/store.service';
import { handelImagePath } from '../../../../shared/services/share-function.service';

declare var favoriteObject: any;

@Component({
  selector: 'favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit, ProfileChildren {
  favoriteList: IFavoriteList[];
  productIds: any[];
  productsModel: any[];
  storeIds: any[];
  imageDefault: any;

  @ViewChildren('deleteIcon') deleteIcon; 

  notification: string;
  @Input() data: any;
  userId: any;

  constructor(
    private _userService: UserService,
    private elRef:ElementRef,
    private _productService: ProductService,
    private _storeService: StoreService,
  ) {
    this.imageDefault = imageDefault;
    this.productsModel = [];
    this.userId = localStorage.getItem(apiUrl.UserId);
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
          
          this.productIds.forEach(element => {
            this._productService.GetProductById(element)
              .subscribe(response => {
                console.log('response', response);
                response.images = handelImagePath(response.images);
                this.productsModel.push(response);
              });
          });

          this.storeIds = this.favoriteList
            .filter(function(y: IFavoriteList) {
              return y.storeId != null ;
            })
           .map(y => y.storeId);
      });
  }

  removeFavoriteItem(id) {
    console.log("removeFavoriteItem works");
    console.log("id: ", id);
    let model = {'userId': this.userId.replace(/['"]+/g, ''), 'productId': id, 'storeId':null};
    return this._userService.deleteFavoriteItem(model)
          .subscribe((data) => {
              console.log("data response ok", data);
              this.deleteItemUI(this.elRef.nativeElement, id);
          });
  }

  deleteItemUI(parent, id) {
    console.log("deleteItemUi element", parent);
    console.log("deleteItemUi id", id);
    favoriteObject.removeHTML(parent, id);
    console.log("done deleteItem UI");
  }
}
