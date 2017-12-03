import { IStore } from './../models/allModel';
import { Observable } from 'rxjs/Rx';
import { Http,Response, Headers  } from '@angular/http';
import { Injectable } from '@angular/core';
import * as apiUrl from './../../constant/apiUrl';

@Injectable()
export class StoreService {
  private storeUrl: string;
  constructor(private _http: Http) { 
    this.storeUrl = apiUrl.Store;
  }

  public GetStoreById(id: string): Observable<any> {
    console.log('getStoreById works');
    console.log(id);
    if(id != null) {
      return this._http.get(this.storeUrl + '/' + id.replace(/['"]+/g, ''))
            .map((response: Response) => <any>response.json());
    }
  }
}
