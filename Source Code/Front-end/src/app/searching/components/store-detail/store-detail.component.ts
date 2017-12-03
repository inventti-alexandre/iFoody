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
  constructor(private _storeService: StoreService, private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.storeId = params['id'];
      console.log(this.storeId);
    });

    this._storeService.GetStoreById(this.storeId)
    .subscribe((data: Response) => {
      console.log(data);
      this.storeModel = data; 
    });
  }
}
