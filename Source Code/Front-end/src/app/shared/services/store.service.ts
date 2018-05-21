import { imageDefault } from './../../constant/global';
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
  private getStoreAddresses: string;
  authToken: any;

  constructor(private _http: Http, private _authService: AuthService) {
    this.storeUrl = apiUrl.Store;
    this.openStoreUrl = apiUrl.OpenStore;
    this.getStoreAddresses = apiUrl.GetStoreAddresses;
    this.authToken = this._authService.retriveToken();
  }

  public GetStoreById(id: string): Observable<any> {
    console.log('getStoreByIddddd works');
    console.log(id);
    if(id != null) {
      console.log('this.storeURL ', this.storeUrl);
      return this._http.get(this.storeUrl + '/' + id.replace(/['"]+/g, ''))
            .map((response: Response) => <any>response.json());
    }

  }

  public GetStoreByUserId(userId:string): Observable<any> {
    console.log('userId',userId);
    if(userId != null) {
      console.log(apiUrl.GetStore + "/?userId=" + userId.replace(/['"]+/g, ''));
      return this._http.get(apiUrl.GetStore + "/?userId=" + userId.replace(/['"]+/g, ''))
            .map((response: Response) =>
              <any>response.json());
    }
  }

  // Get Locations By StoreIds
  GetLocationsByStoreIds(storeIds: any[]) {
    console.log("GetLocationsByStoreIds works");

    if(storeIds.length > 0) {
      console.log('storeIds',storeIds);
      let encodedStoreIds = encodeURIComponent(JSON.stringify(storeIds));
      return this._http.get(this.getStoreAddresses + '/?storeIds=' + encodedStoreIds)
            .map((response: Response) => <any>response.json())
            .do(data => {
              console.log('locationData return: ',data);
            })
          .catch(this.handleError);
    }
    return null;
  }

  // GET Image by Store Id
  getImageByStoreId(storeId: any) {
    console.log("getImageByStoreId works");
    if(storeId != null) {
      return this._http.get(apiUrl.GetImageByStoreId + '/?storeId=' + storeId)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
  }

   // Tuan made
  GetReviewListByStoreId(id: string): Observable<any> {
    console.log("getReviewListByStoreId works");
    console.log('storeId', id);
    if(id != null) {
      return this._http.get(apiUrl.StoreReview + '/' + id.replace(/['"]+/g,''))
            .map((response: Response) => <any>response.json())
            .catch((erro: any) => {
              return Observable.of(erro);
            })
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

  // UPDATE Store
  updateStore(id: any, model: any) {
    console.log("updateStore SErvice");
    console.log('model', model);
    let body = JSON.stringify(model);
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions( {headers: headers});

    return this._http.put(apiUrl.Store + '/' + id.replace(/['"]+/g,''), body, options)
      .catch(this.handleError);
  }

  // Delete Product Image
  deleteImage(id: string): Observable<any> {
    console.log("deleteImage in StoreService works.");
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});

    return this._http.delete(apiUrl.StoreImage + '/' + id, options)
      // .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  // Delete Store in StoreDetailComponent
  deleteStore(id: string): Observable<any> {
    console.log("delete store in StoreService works");
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});

    return this._http.delete(apiUrl.DeleteStore  + '/' + id.replace(/['"]+/g,''), options)
    .catch(this.handleError);
  }

  // Handle Error
  private handleError(error: Response) {
    console.log("handleError works.");
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
