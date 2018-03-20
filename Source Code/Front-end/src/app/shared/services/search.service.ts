import { element } from "protractor";
import { ICategory } from "./../models/allModel";
import * as apiUrl from "./../../constant/apiUrl";
import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs/Rx";

@Injectable()
export class SearchService {
  private actionUrl: string;

  constructor(private _http: Http) {
    this.actionUrl = apiUrl.SearchPaging;
  }
  public fomatParamater = p => {
    return (p = p.replace(/['"]+/g, ""));
  };

  public SearchPaging = (searchString, page, count?): Observable<any> => {
    let listProduct = [];
    let url;
    if (count) {
      url =
        this.actionUrl +
        "/?searchString=" +
        searchString +
        "&page=" +
        page +
        "&count=" +
        count;
    } else {
      url =
        this.actionUrl +
        "/?searchString=" +
        searchString +
        "&page=" +
        page +
        "&count";
    }
    return this._http
      .get(url)
      .map((response: Response) => <any>response.json())
      .do(x => {
        listProduct.push(x);
      })
      .catch((error: any) => {
        if (error.status === 404) {
          alert(error.status);
          return Observable.throw(new Error(error.status));
        }
      });
  };

  public SuggestListByUserId = (userId, count?): Observable<any> => {
    let listProduct = [];
    let url;
    userId = this.fomatParamater(userId);
    if (count) {
      url = this.actionUrl + "/?userId=" + userId + "&count=" + count;
    } else {
      url = this.actionUrl + "/?userId=" + userId + "&count";
    }
    return this._http
      .get(url)
      .map((response: Response) => <any>response.json())
      .do(x => {
        listProduct.push(x);
      });
  };
  public SuggestListByRating = (count?): Observable<any> => {
    let listProduct = [];
    let url;
    if (count) {
      url = this.actionUrl + "/?count=" + count;
    } else {
      url = this.actionUrl + "/?count";
    }
    return this._http
      .get(url)
      .map((response: Response) => <any>response.json())
      .do(x => {
        listProduct.push(x);
      });
  };
}
