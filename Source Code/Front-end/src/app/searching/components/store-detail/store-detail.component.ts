import { UserService } from './../../../shared/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StoreService } from './../../../shared/services/store.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {
  storeId;
  storeIds: any[];
  @Output() storeModel: any;
  storeInfoModel: any;
  productModel: any;
  constructor(
    private _storeService: StoreService, 
    private router: Router, 
    private route: ActivatedRoute,
    private _userService: UserService
    ) {
    this.route.params.subscribe((params: Params) => {
      console.log('params id ', params['id']);
      this.storeIds = [params['id']]; // For Google Map Api
      this.storeId = params['id'];
      // this._storeService.GetStoreById(params['id'])
      //   .subscribe((data: Response) => {
      //     console.log('storeModel in parent: ', data);
      //     this.storeModel = data; 
      //   });
      
      this._storeService.GetStoreById(params['id'])
        .subscribe(data => {
          console.log("storeInfoModel", data);
          this.storeInfoModel = data;
          this._userService.getAllProductInStore(params['id'])
            .subscribe(result => {
              console.log("data return from GetALlProductInStore: ", result);
              this.storeModel = result;
            },
            error => {
              console.log(error);
            });
        });

      

      

    });

   }

  ngOnInit() {
    
  }
}
