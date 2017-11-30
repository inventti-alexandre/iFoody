import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as apiUrl from '../../constant/apiUrl';
@Injectable()
export class AuthGuardService implements CanActivate {
  signInUrl: string;
  constructor(private _authService: AuthService, public router: Router) {
    this.signInUrl = apiUrl.SignIn;
   }

  canActivate(): boolean {
    // Calling method in Auth Service for checking Existing Auth Token in Local Storage of Browser
    if(!this._authService.isAuthenticated()) {
      console.log("canActivate works");
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
