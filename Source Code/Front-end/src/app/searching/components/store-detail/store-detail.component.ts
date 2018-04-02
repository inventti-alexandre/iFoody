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
  @Output() storeModel: any;
  productModel: any;
  constructor(
    private _storeService: StoreService, 
    private router: Router, 
    private route: ActivatedRoute,
    private _userService: UserService
    ) {
    this.route.params.subscribe((params: Params) => {
      this.storeId = params['id'];
      // this._storeService.GetStoreById(params['id'])
      //   .subscribe((data: Response) => {
      //     console.log('storeModel in parent: ', data);
      //     this.storeModel = data; 
      //   });
      this._userService.getAllProductInStore(this.storeId)
      .subscribe(data => {
        console.log("data return from GetALlProductInStore: ", data);
        this.storeModel = data;
      },
      error => {
        console.log(error);
      });
    });

   }

  ngOnInit() {
    
  }
}
