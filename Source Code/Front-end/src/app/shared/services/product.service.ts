import { IProduct } from './../models/product';
import * as apiUrl from './../../constant/apiUrl';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

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
}
