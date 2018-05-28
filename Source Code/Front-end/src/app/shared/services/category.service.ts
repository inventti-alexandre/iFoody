import { element } from 'protractor';
import { ICategory } from './../models/allModel';
import * as apiUrl from './../../constant/apiUrl';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CategoryService {
  private actionUrl: string;

  constructor(private _http: Http) {
    this.actionUrl = apiUrl.GetAllCategories;
  }

  public GetAll = (): Observable<any> => {
    let categories = [];
    return this._http.get(this.actionUrl)
        .map((response: Response) => <any>response.json())
        .do(x => {
          categories.push(x);
          }
        );
  }

  public GetCategoryById = (id: string): Observable<any> => {
    console.log('getCategoryById works');
    console.log('categoryId: ', id);
    return this._http.get(apiUrl.GetAllCategories + '/' + id)
      .map((response: Response) => <any>response.json())
  }

}
