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
    var listProduct = [];
    return this._http.get(this.actionUrl)
        .map((response: Response) => <any>response.json())
        .do(x => listProduct.push(x));
  }
}
