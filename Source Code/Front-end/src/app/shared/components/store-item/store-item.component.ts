import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { StoreService } from './../../services/store.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { IStore } from './../../models/allModel';
import { Component, Input, OnInit } from '@angular/core';
import * as apiUrl from '../../../constant/apiUrl';

@Component({
  selector: 'favorite-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss']
})
export class StoreItemComponent implements OnInit {
  @Input() storeId: string;
  storeModel: any;
  storeUrl: string;
  // name: string;
  // price: number;
  constructor(private _userService: UserService,
            private _http: Http, 
            private route: ActivatedRoute,
            private router: Router,  
  ) { 
    this.storeUrl = apiUrl.Store;
    console.log(this.storeId);
    // this.store = new FormGroup({
    //   name: new FormControl(),
    //   rating: new FormControl(),
    //   // openHour: new FormControl(),
    //   // closeHour: new FormControl(),
    //   lowestPrice: new FormControl(),
    //   highestPrice: new FormControl(),
    //   // description: new FormControl(),
    //   // registrationDate: new FormControl(),
    //   address: new FormControl(),
    //   district: new FormControl(),
    //   // city: new FormControl(),
    //   categoryId: new FormControl(),
    //   // userId: new FormControl(),
    // });
  }

  ngOnInit() {
    console.log(this.storeId);
    this._userService.getStoreById(this.storeId)
    .subscribe(data =>{

    console.log(data);
        this.storeModel = data;
      });
  }

  getStoreDetail() {
    console.log(this.storeId );
    if(this.storeId != null) {
      return this._userService.getStoreById(this.storeId.replace(/['"]+/g, ''))
        .subscribe((data: Response) => {
          this.router.navigate(['/store', this.storeId]);
        });
    }
    return null;
  }

}
