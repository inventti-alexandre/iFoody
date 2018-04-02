import * as apiUrl from './../../../../constant/apiUrl';
import { CategoryService } from './../../../../shared/services/category.service';
import { ProfileChildren } from '../../../models/profileChildren';
import { FormGroup, FormControl } from '@angular/forms';
import { IStore } from '../../../../shared/models/allModel';
import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../../shared/services/store.service';
import { imageDefault } from '../../../../constant/global';
@Component({
  selector: 'store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.scss']
})
export class StoreProfileComponent implements OnInit, ProfileChildren, AfterViewInit {

  @Input('store') store;
  @Input() data: any;
  storeForm: any;
  categories: any;
  images: any;

  constructor(private cdr: ChangeDetectorRef, 
    private _storeService: StoreService, 
    private activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private router: Router) { 
      this.images = [];
      this.storeForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl(),
        rating: new FormControl(),
        ratingCount: new FormControl(),
        openHour: new FormControl(),
        closeHour: new FormControl(),
        lowestPrice: new FormControl(),
        highestPrice: new FormControl(),
        description: new FormControl(),
        registrationDate: new FormControl(),
        address: new FormControl(),
        district: new FormControl(),
        city: new FormControl(),
        categoryId: new FormControl(),
      });

      this._storeService.GetStoreByUserId(localStorage.getItem(apiUrl.UserId).replace(/['"]+/g, ''))
      .subscribe(data => {
        console.log(data);
        this.store = data;
        let registrationDate = new Date(this.store.registrationDate);
        this.store.registrationDate = registrationDate.getDate() + '-' + registrationDate.getMonth() + '-' + registrationDate.getFullYear();
       
        this.storeForm.setValue({
          id: this.store.id,
          name: this.store.name,
          rating: this.store.rating,
          ratingCount: this.store.ratingCount,
          openHour: this.store.openHour,
          closeHour: this.store.closeHour,
          lowestPrice: this.store.lowestPrice,
          highestPrice: this.store.highestPrice,
          description: this.store.description,
          registrationDate: this.store.registrationDate,
          address: this.store.address,
          district: this.store.district,
          city: this.store.city,
          categoryId: this.store.categoryId
        });

        this._storeService.getImageByStoreId(this.store.id)
          .subscribe(response => {
            console.log('response images', response);
              if(response.length === 0) {
                console.log("33");
                response = {path: imageDefault, name: 'unknown'};
                console.log(response);
              }
              this.images.push(response);
              console.log('images', this.images);
            });
      });
  }

  ngOnInit() {
    this._categoryService.GetAll()
      .subscribe(response => {
        this.categories = response;
      });
    this.cdr.detectChanges();
  }
  
  ngAfterViewInit() {
  }
  
  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    } else {
        return null;
    }
  }

  onSubmit() {
    console.log('onsubmit', this.storeForm.value);
    this._storeService.updateStore(this.storeForm.value)
      .subscribe(response => {
        console.log("update successfully");
        console.log("response in TS", response);
        alert("updateStore successfully!!!");
      });
    
  }
  backToGeneral() {
    console.log("backtoGeneral works");
    this.router.navigate(["profile", localStorage.getItem("user_id").replace(/['"]+/g, ''), 'overview']);
  }
}
