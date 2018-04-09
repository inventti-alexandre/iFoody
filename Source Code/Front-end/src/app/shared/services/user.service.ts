import { forEach } from '@angular/router/src/utils/collection';
import { FavoriteList } from './../../constant/apiUrl';
import { tryCatch } from 'rxjs/util/tryCatch';
import { AuthService } from './auth.service';
import { IUser, IToken } from '../models/allModel';
import { ObserveOnMessage } from 'rxjs/operators/observeOn';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import * as apiUrl from '../../constant/apiUrl';

@Injectable()
export class UserService {
  domain: string;
  getUrl: string;
  signUpUrl: string;
  signInUrl: string;
  uploadUrl: string;
  reviewUrl: string;
  commentUrl: string;
  storeUrl: string;
  imageUrl: string;
  favoriteListUrl: string;
  // _authService: AuthService;
  authToken: any;
  isAuthenticated: boolean;

  user: any;
  userId: string;
  username: string;

  constructor(private _http: Http, private _authService: AuthService) {
    this.domain = apiUrl.Domain;
    this.getUrl = apiUrl.GetUser;
    this.signUpUrl = apiUrl.SignUp;
    this.signInUrl = apiUrl.SignIn;
    this.uploadUrl = apiUrl.Upload;
    this.reviewUrl = apiUrl.Review;
    this.commentUrl = apiUrl.Comment;
    this.storeUrl = apiUrl.Store;
    this.favoriteListUrl = apiUrl.FavoriteList;
    this.authToken = this._authService.retriveToken();
    this.userId = localStorage.getItem("user_id");
  }
  
  // Check Authenticated
  public getAuthenticated() {
   return false;
  }
  
  // GET All Users
  // For Admin
  getAllUsers(): Observable<any> {
    console.log("GetAllUsers works.");
    return this._http.get(this.getUrl)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  
  // GET Many Users
  // For Admin
  getManyUser(idList: string[]): Observable<any> {
    console.log("getManyUser works");
    console.log(idList);
    if(idList.length > 0) {
      let users: IUser[];
      idList.forEach(element => {
        this._http.get(this.getUrl + element.replace(/['"]+/g, ''))
                    .map((response: Response) => <any>response.json())
                    .catch(this.handleError)
                    .subscribe(u => {
                      console.log("User trong Review list ne");
                      console.log(u);
                      users.push(u);
                    });
      });
      return null;
    }
  }

  // GET User By Id
  getUserById(id: string): Observable<any> {
    if(id != null) {
      return this._http.get(this.getUrl + '/' + id.replace(/['"]+/g, ''))
        .map((response: Response) => 
          <any>response.json())
        .catch(this.handleError);
    }
    return null;
  }

  // GET Favorite Product and Wish Store from User Id
  getFavoriteList(id: string): Observable<any> {
    // console.log("getFavoriteList works.");
    if(id != null) {
      return this._http.get(this.favoriteListUrl + '/' + id.replace(/['"]+/g, ''))
        .map((response: Response) => {
            return <any>response.json() ; 
           })
        .catch(this.handleError);
    }
    return null;
  }

  // GET Store By User Id
  getStoreById(id: string): Observable<any> {
    if(id != null) {
      return this._http.get(this.storeUrl + '/' + id.replace(/['"]+/g, ''))
        .map((response: Response) => {
            return <any>response.json() ; 
           })
        .catch(this.handleError);
    }
    return null;
  }

  // GET Products in Store By StoreId
  getAllProductInStore(storeId: string): Observable<any> {
    console.log("getAllProductInStore in UserService works");
    console.log('storeId', storeId);
    if(storeId != null) {
      console.log("inside");
      console.log(this.storeUrl + '/allProducts' + '/' + storeId.replace(/['"]+/g,''));
      return this._http.get(this.storeUrl + '/allProducts' + '/' + storeId.replace(/['"]+/g,''))
            .map((response: Response) => <any>response.json());
    }
  }

  // GET Review List of User by UserId
  getReviewListByUserId(id: string): Observable<any> {
    console.log("getReviewListByUserId works");
    console.log(id);
    if(id != null) {
      return this._http.get(this.reviewUrl + '/' + id.replace(/['"]+/g,''))
            .map((response: Response) => <any>response.json());
    }
  }

  // POST - User Sign up 
  signUp(user: IUser): Observable<any> {
    console.log("SignUp works");
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type' : 'application/json'});
    let options = new RequestOptions( {headers: headers});

    return this._http.post(this.signUpUrl, body, options)
      .map((response: Response) => <IUser>response.json())
      .catch(this.handleError);
  }

  // POST - User Sign In
  signIn(email: string, password: string) {
    let headers: Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(email + ":" + password)); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions( {headers: headers});
    console.log("SIGN IN");
    return this._http.post(this.signInUrl, null, options)
      .map((response: Response) => (response.json()))
      .do((x: IToken) => {
        console.log(x);
          this._authService.storeToken(x.authToken);
          this.isAuthenticated = true; 
          this._authService.storeUserId(x.userId);
          // let user = this.getUserById(x.userId).map((data: Response) => data.json()).subscribe(u => u.json());
      });
  }

  // POST - Upload Image
  uploadImage(model: any): Observable<any> {
    console.log("uploadImage works");
    let body = JSON.stringify(model);
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions( {headers: headers});

    return this._http.post(this.uploadUrl, body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  // POST - Insert Review
  insertReview(model: any): Observable<any> {
    console.log("insertReview works.");
    let body = JSON.stringify(model);
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    console.log(body);
    let options = new RequestOptions( {headers: headers});

    return this._http.post(this.reviewUrl, body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError); 
  }

  // POST - Insert Comment
  insertComment(model: any): Observable<any> {
    console.log("insertComment works.");
    let body = JSON.stringify(model);
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions( {headers: headers});

    return this._http.post(this.commentUrl, body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError); 
  }

  // POST - User Sign Out
  signOut() {
    console.log("signOut works.");
    this._authService.deleteToken();
    return true;
  }

  // POST - Insert Favorite Product
  // InsertFavoriteProduct(userId: string, productId: string, storeId: string) {
  InsertFavoriteProduct(model: any) {
    
    console.log("InsertFavoriteProduct Service works");
    
    // let body = JSON.stringify({'userId': userId.replace(/['"]+/g,''), 'productId': productId, 'storeId': storeId});
    let body = JSON.stringify(model);
    console.log("body http", body);
    let headers = new Headers({'Content-Type' : 'application/json'});
    headers.append("Token", this.authToken); 
    let options = new RequestOptions( {headers: headers});

    return this._http.post(this.favoriteListUrl, body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
   
  // PUT - Update User
  updateUser(id: string, model: any): Observable<any> {
    console.log("Update User works");
    console.log(id);  
    console.log(model);
    let body = JSON.stringify(model);
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});
    
    return this._http.put(this.getUrl + '/' + id.replace(/['"]+/g,''), body, options)
      .map((response: Response) =>
              // <any>response.json()
              console.log(response)
      )
      .do( x => console.log(x))
      .catch(this.handleError);
  }

  // PUT - Update Password
  updatePassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
    if(email != null && oldPassword != null && newPassword != null) {
      let headers: Headers = new Headers();
      headers.append("Authorization", "Basic " + btoa(email + ":" + oldPassword + ":" + newPassword)); 
      headers.append("Content-Type", "application/json");
      let options = new RequestOptions( {headers: headers});
  
      return this._http.put(apiUrl.ChangePassword, null, options);
    }
  }

  // PUT - Update Image
  updateImage(id: string, model: any): Observable<any> {
    console.log("Update Image works");
    let body = JSON.stringify(model);
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});
    
    return this._http.put(this.imageUrl + '/' + id, body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  // No user - PUT - Update Store
  updateStore(id: string, model: any): Observable<any> {
    console.log("Update Store works");
    let body = JSON.stringify(model);
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});
    
    return this._http.put(this.storeUrl + '/' + id, body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  // PUT - Update Review
  updateReview(id: string, model: any): Observable<any> {
    console.log("Update Review works");
    let body = JSON.stringify(model);
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});
    
    return this._http.put(this.reviewUrl + '/' + id, body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  // PUT - Update Comment
  updateComment(id: string, model: any): Observable<any> {
    console.log("Update Comment works");
    let body = JSON.stringify(model);
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});
    
    return this._http.put(this.commentUrl + '/' + id, body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  // DELETE - User By Id
  // For Admin
  deleteUser(id: string): Observable<any> {
    console.log("delete User works.");
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});

    return this._http.delete(this.getUrl + '/' + id, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  
  // DELETE - Favorite Item
  deleteFavoriteItem(model: any): Observable<any> {
    console.log("delete Favorite Item works.");
    let body = encodeURIComponent(JSON.stringify(model));
    console.log("body encoded", body);
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});
    
    return this._http.delete(this.favoriteListUrl + '?item=' + body, options)
      .map((response: Response) => console.log("respóne", response))
      .do(x => alert("Đã xóa mục yêu thích!"))
      .catch(this.handleError);
  }

  // DELETE Store Image
  deleteImage(id: string): Observable<any> {
    console.log("deleteImage in Userservice works.");
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});

    return this._http.delete(apiUrl.UserImage + '/' + id, options)
      // .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  // DELETE - Store
  deleteStore(id: string): Observable<any> {
    console.log("delete Store works.");
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});

    return this._http.delete(this.storeUrl + '/' + id, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  // DELETE - Store
  deleteReview(id: string): Observable<any> {
    console.log("delete Review works.");
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});

    return this._http.delete(this.reviewUrl + '/' + id, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  // DELETE - Store
  deleteComment(id: string): Observable<any> {
    console.log("delete Comment works.");
    let headers = new Headers();
    headers.append("Token", this.authToken); 
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({headers: headers});

    return this._http.delete(this.commentUrl + '/' + id, options)
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
