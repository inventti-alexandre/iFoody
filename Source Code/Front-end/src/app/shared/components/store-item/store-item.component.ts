import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { IStore } from './../../models/store';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'favorite-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss']
})
export class StoreItemComponent implements OnInit {
  @Input() storeId: string;
  store: IStore;
  // name: string;
  // price: number;
  constructor(private _userService: UserService) { 
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
          this.store = data;
        });
  }


}
