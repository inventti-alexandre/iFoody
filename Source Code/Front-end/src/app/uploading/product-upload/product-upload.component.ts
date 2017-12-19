import { ProductService } from './../../shared/services/product.service';
import { StoreService } from '../../shared/services/store.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as apiUrl from '../../constant/apiUrl';
import * as model from '../../shared/models/allModel';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.scss'],
})
export class ProductUploadComponent implements OnInit {
  userId: string;
  uploadProduct: FormGroup;
  newProduct: model.IProduct;
  category: any[];
  store: string;

  constructor(private _storeService: StoreService, private _categoryService:CategoryService, private _productService: ProductService) { 
    this.userId = localStorage.getItem(apiUrl.UserId);
    this.category = [];
    this._storeService.GetStoreByUserId(this.userId).subscribe(data=>this.store = data.id);
  }
  createIProduct=(info)=>{
    let product={
      id:null,
      name:info.name,
      price:info.price,
      description:info.decription,
      categoryId:info.type,
      storeId: this.store,
    };
    this.newProduct = product;
  }
  onSubmit(event) {
    if(event.detail===1){ // check double click 
      this.createIProduct(this.uploadProduct.value);
      this._productService.AddNewProduct(this.newProduct).subscribe(
        (data) => console.log("new product add success",data)
      );
    }
  }
  select(){
     // console.log('type', this.uploadProduct.value);
  }
  ngOnInit() {
    this.uploadProduct = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      decription: new FormControl(),
      type: new FormControl(),
    });
    // get all category
    this._categoryService.GetAll().subscribe(data=>{
      this.category = data;
    });
  }
}
