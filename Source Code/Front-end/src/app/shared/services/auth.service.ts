import { ChangePassword } from './../../constant/apiUrl';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import * as apiUrl from '../../constant/apiUrl';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  private tokenKey = apiUrl.AuthToken;
  private userId = apiUrl.UserId;
  // private _userService: UserService;
  constructor(private _http: Http) { 
    // this._userService = new UserService();
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
}
