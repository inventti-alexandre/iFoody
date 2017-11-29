import { element } from 'protractor';
import { Category } from './../models/allModel';
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
    var categories = [];
    return this._http.get(this.actionUrl)
        .map((response: Response) => <any>response.json())
        .do(x => categories.push(x));
  }

}
