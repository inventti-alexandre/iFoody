import { Injectable } from '@angular/core';
import * as apiUrl from '../../constant/apiUrl';

@Injectable()
export class AuthService {
  private tokenKey = apiUrl.AuthToken;
  private userId = apiUrl.UserId;
  constructor() { }

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
}
