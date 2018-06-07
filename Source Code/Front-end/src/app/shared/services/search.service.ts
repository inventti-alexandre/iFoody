import { element } from "protractor";
import { ICategory,ISearchParam } from "./../models/allModel";
import * as apiUrl from "./../../constant/apiUrl";
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import "rxjs/Rx";
import { Observable } from "rxjs/Rx";

@Injectable()
export class SearchService {
  private actionUrl: string;

  constructor(private _http: Http) {
    this.actionUrl = apiUrl.Search;
  }
  public fomatParamater = p => {
    return (p = p.replace(/['"]+/g, ""));
  }

  public Search = (param:ISearchParam): Observable<any> => {
    let body = JSON.stringify(param);
    let headers = new Headers();
    // headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions( {headers: headers});

    return this._http.post(this.actionUrl, body,options)
      .map((response: Response) => <any>response.json())
      .catch((erro:any)=>{
        throw Observable.throw(erro);
      })
  }

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
  }

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
  }

  public GetSimilarStores = (storeId,page, count?): Observable<any> => {
    let listProduct = [];
    let url;
    storeId = this.fomatParamater(storeId);
    if (count) {
      url = this.actionUrl + "/?storeId=" + storeId + "&page=" + page + "&count=" + count;
    } else {
      url = this.actionUrl + "/?storeId=" + storeId + "&page=" + page + "&count";
    }
    return this._http
      .get(url)
      .map((response: Response) => <any>response.json())
      .catch((erro:any)=>{
        return Observable.of(erro);
      });
  }
}
