import { AuthService } from './auth.service';
import { IStore } from './../models/allModel';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import * as apiUrl from './../../constant/apiUrl';

@Injectable()
export class StoreService {
  private storeUrl: string;
  private openStoreUrl: string;
  authToken: any;
  private storeControllerUrl: string;
  
  constructor(private _http: Http, private _authService: AuthService) { 
    this.storeUrl = apiUrl.Store;
    this.openStoreUrl = apiUrl.OpenStore;
    this.storeControllerUrl = apiUrl.GetStore;
    this.authToken = this._authService.retriveToken();
  }

  public GetStoreById(id: string): Observable<any> {
    console.log('getStoreById works');
    console.log(id);
    if(id != null) {
      return this._http.get(this.storeUrl + '/' + id.replace(/['"]+/g, ''))
            .map((response: Response) => <any>response.json());
    }
  
  }

  public GetStoreByUserId(userId:string): Observable<any> {
    if(userId != null) {
      return this._http.get(this.storeControllerUrl + "/?userId=" + userId.replace(/['"]+/g, ''))
            .map((response: Response) => <any>response.json());
    }
  } 

  // POST - User Open Store
  openStore(model: any):Observable<any> {
    console.log("openStoreService works.");
    console.log(model);
    let body = JSON.stringify(model);
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    
    let options = new RequestOptions( {headers: headers});

    return this._http.post(this.openStoreUrl, body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError); 
  }

  // Handle Error in Other Methods
  private handleError(error: Response) {
    console.log("handleError works.");
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
