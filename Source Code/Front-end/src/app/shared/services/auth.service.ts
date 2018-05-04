import { ChangePassword, GetUser, ProductCategory, GetAllProduct } from './../../constant/apiUrl';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import * as apiUrl from '../../constant/apiUrl';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private tokenKey = apiUrl.AuthToken;
  private userId = apiUrl.UserId;
  private authToken: any;
  
  // private _userService: UserService;
  constructor(private _http: Http) { 
    // this._userService = new UserService();
    this.authToken = this.retriveToken();
  }

  // check Authenticated. AuthGuardService will use this method for guarding Route 
  public isAuthenticated() {
    const authToken = localStorage.getItem(this.tokenKey);
    if(authToken != null) {
      return true;
    }
    else {
      return false;
    }
  }
  
  // Store Token from Backend
  storeToken(authToken: string) {
    localStorage.setItem(this.tokenKey  , JSON.stringify(authToken));
  }

  // Store User Id
  storeUserId(id: string) {
    localStorage.setItem(this.userId, JSON.stringify(id));
  }

  // Retrieve Token in Local Storage
  retriveToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Delete Token in Local Storage
  deleteToken() {
    localStorage.removeItem(this.userId);
    return localStorage.removeItem(this.tokenKey);
  }

  // Check Credentials
  checkCredential(email: string, password: string) {
    console.log("checkCredential in AuthService works");
    
    if(email != null && password != null) {
      let headers: Headers = new Headers();
      headers.append("Authorization", "Basic " + btoa(email + ":" + password)); 
      headers.append("Content-Type", "application/json");
      let options = new RequestOptions( {headers: headers});
  
      return this._http.get(apiUrl.ChangePassword, options);
    }
  }

  // Admin Service
  // STORES
  // Get All Stores
  getAllStores():Observable<any> {
    console.log('getAllStore works');
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions( {headers: headers});

    return this._http.get(apiUrl.Store, options)
      .catch(this.handleError); 
  }

  // Get Stores by CategoryId
  getStoresByCategory(id: string):Observable<any> {
    console.log('getStoresByCategory works');
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions( {headers: headers});

    return this._http.get(apiUrl.StoreCategory + '/?categoryId=' + id, options)
      .catch(this.handleError); 
  }

  // Get Stores By District
  getStoresByDistrict(city: string, district: string):Observable<any> {
    console.log('getStoresByDistrict works');
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions( {headers: headers});

    return this._http.get(apiUrl.GetStore + '/?city=' + city + '&district=' + district, options)
      .catch(this.handleError); 
  }

  // Get Stores By Name
  getStoreByName(name: string):Observable<any> {
    console.log('getStoreByName works');
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions( {headers: headers});

    return this._http.get(apiUrl.Store + '/?name=' + name,  options)
      .catch(this.handleError); 
  }

  // USERS
  // Get All Users
  getAllUsers():Observable<any> {
    console.log('getAllUsers works');
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions( {headers: headers});

    return this._http.get(apiUrl.GetAllUsers, options)
      .catch(this.handleError); 
  }

  // Get Users By Ages
  getUsersByAges() {
    console.log('getUsersByAges is implementing');
    // let headers = new Headers();
    // headers.append("Token", this.authToken);
    // headers.append("Content-Type", "application/json");

    // let options = new RequestOptions( {headers: headers});

    // return this._http.get(apiUrl.Store + '/' + id.replace(/['"]+/g,''), options)
    //   .catch(this.handleError); 
  }

  // // Get Users By Registration Date (newer or older)
  // getUsersByRegistrationDate() {
  //   console.log('getUsersByRegistrationDate works');
  //   let headers = new Headers();
  //   headers.append("Token", this.authToken);
  //   headers.append("Content-Type", "application/json");

  //   let options = new RequestOptions( {headers: headers});

  //   return this._http.get(apiUrl.GetUser + '/new', options)
  //     .catch(this.handleError); 
  // }

  // PRODUCTS
  // Get All Products
  getAllProducts():Observable<any> {
    console.log('getAllProducts works');
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions( {headers: headers});

    return this._http.get(apiUrl.GetAllProduct, options)
      .catch(this.handleError); 
  }

  // Get Products By CategoryID
  getProductsByCategoryId(id: string) {
    console.log('getProductsByCategoryId works');
    // let headers = new Headers();
    // headers.append("Token", this.authToken);
    // headers.append("Content-Type", "application/json");

    // let options = new RequestOptions( {headers: headers});

    // return this._http.get(apiUrl.ProductCategory + '/?categoryId=' + id, options)
    //   .catch(this.handleError); 
  }

  // // Get Products By Name 
  // getProductsByName() {
  //   console.log('getAllStore works');
  //   let headers = new Headers();
  //   headers.append("Token", this.authToken);
  //   headers.append("Content-Type", "application/json");

  //   let options = new RequestOptions( {headers: headers});

  //   return this._http.get(apiUrl.Store + '/' + id.replace(/['"]+/g,''), options)
  //     .catch(this.handleError); 
  // }

  // Get Products By Exact Store Name
  getProductsByStoreName() {
    console.log('getProductsByStoreName works');
    // let headers = new Headers();
    // headers.append("Token", this.authToken);
    // headers.append("Content-Type", "application/json");

    // let options = new RequestOptions( {headers: headers});

    // return this._http.get(apiUrl.Store + '/' + id.replace(/['"]+/g,''), options)
    //   .catch(this.handleError); 
  }

  // STATISTICS
  // Get Count of Total Users
  getCountOfTotalUsers():Observable<any> {
    console.log('getCountOfTotalUsers works');
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions( {headers: headers});

    return this._http.get(apiUrl.GetUser + '/count', options)
      .catch(this.handleError); 
  }

  // Get Count of Total Stores
  getCountOfTotalStores() {
    console.log('getCountOfTotalStores works');
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions( {headers: headers});

    return this._http.get(apiUrl.GetStore + '/count', options)
      .catch(this.handleError); 
  }

  // Get Count of Total Products
  getCountOfTotalProducts():Observable<any> {
    console.log('getCountOfTotalProducts works');
    let headers = new Headers();
    headers.append("Token", this.authToken);
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions( {headers: headers});

    return this._http.get(apiUrl.GetAllProduct, options)
      .catch(this.handleError); 
  }

  // Handle Error
  private handleError(error: Response) {
    console.log("handleError works.");
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
