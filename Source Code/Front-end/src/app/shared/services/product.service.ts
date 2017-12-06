import { IProduct } from './../models/allModel';
import { element } from 'protractor';
import * as apiUrl from './../../constant/apiUrl';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {CategoryService} from './category.service';

@Injectable()
export class ProductService {
  private actionUrl: string;
  private reviewUrl: string;

  constructor(private _http: Http) {
    this.actionUrl = apiUrl.GetAllProduct;
    this.reviewUrl = apiUrl.ProductReview;
  }

  public GetAll = (): Observable<any> => {
    let listProduct = [];
    return this._http.get(this.actionUrl)
        .map((response: Response) => <any>response.json())
        .do(x => {
          listProduct.push(x);
          console.log(x);
        });
  }

  public GetProductByCategoryId=(categoryId): Observable<any> => {
    let listProduct = [];
    if(categoryId != null) {
      return this._http.get(this.actionUrl + '/' + categoryId.replace(/['"]+/g, ''))
            .map((response: Response) => <any>response.json())
            .do(x => {
              listProduct.push(x);
              console.log(x);
            });
    }
  }
  public PagingAllProducts=(page, count?): Observable<any> => {
    let listProduct = [];
    let url;
    if(count){
      url = this.actionUrl + "/?page=" + page + "&count=" + count;
    }else{
      url = this.actionUrl +  "/?page=" + page + "&count";
    }
    return this._http.get(url)
        .map((response: Response) => <any>response.json())
        .do(x => {
          listProduct.push(x);
          console.log(x);
        });
  }
  public PagingAllProductsByCategory=(categoryId,page, count?): Observable<any> => {
    let listProduct = [];
    let url;
    if(count){
      url = this.actionUrl + "/?categoryId=" +categoryId +"&page=" + page + "&count=" + count;
    }else{
      url = this.actionUrl +   "/?categoryId=" +categoryId +"&page=" + page + "&count";
    }
    return this._http.get(url)
        .map((response: Response) => <any>response.json())
        .do(x => {
          listProduct.push(x);   
        });
  }

  // Tuan made
  public GetProductById(id: string): Observable<any> {
    console.log('getProductById works');
    console.log(id);
    if(id != null) {
      return this._http.get(this.actionUrl + '/' + id.replace(/['"]+/g, ''))
            .map((response: Response) => <any>response.json());
          }
  }
  // Tuan made
  public GetReviewListByProductId(id: string): Observable<any> {
    console.log("getReviewListByProductId works");
    console.log(id);
    if(id != null) {
      return this._http.get(this.reviewUrl + '/' + id.replace(/['"]+/g,''))
            .map((response: Response) => <any>response.json());
    }
  }
}
