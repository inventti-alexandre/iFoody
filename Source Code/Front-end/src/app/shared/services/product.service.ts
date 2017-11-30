<<<<<<< HEAD
import { IProduct } from './../models/product';
=======
import { element } from 'protractor';
>>>>>>> origin/Phuong_Dev
import * as apiUrl from './../../constant/apiUrl';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
<<<<<<< HEAD
=======
import {CategoryService} from './category.service';
>>>>>>> origin/Phuong_Dev

@Injectable()
export class ProductService {
  private actionUrl: string;

  constructor(private _http: Http) {
    this.actionUrl = apiUrl.GetAllProduct;
  }

  public GetAll = (): Observable<any> => {
    let listProduct = [];
    return this._http.get(this.actionUrl)
        .map((response: Response) => <any>response.json())
        .do(x => listProduct.push(x));
  }

<<<<<<< HEAD
  // Tuan made
  public GetProductById(id: string) {
    console.log('getProductById works');
    console.log(id);
    if(id != null) {
      let products: IProduct[];
      return this._http.get(this.actionUrl + '/' + id.replace(/['"]+/g, ''))
            .map((response: Response) => <any>response.json());
    }
  }
=======
  public GetProductByCategory=(categoryName, products, result): Observable<any> => {
    var temp = products.filter(i => i.category.name ==categoryName);
    if(temp.length!==0){
      result.categoryName = categoryName;
      result.products = temp;
    }
    return result;
  }

>>>>>>> origin/Phuong_Dev
}
