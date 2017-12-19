import { tryCatch } from 'rxjs/util/tryCatch';
import { AuthService } from './../../../shared/services/auth.service';
import { IUser } from './../../../shared/models/allModel';
import { LoginComponent } from './../../../membership/components/shared/login/login.component';
import * as global from './../../../constant/global';
import { Component, HostListener, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { Response } from '@angular/http/src/static_response';
import * as apiUrl from './../../../constant/apiUrl';

@HostListener('window:resize', ['$event'])
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  isMobile= false;
  nameApp = global.nameApp;
  isAuthenticated: boolean;
  userId: string;
  userName: string;
  email: string;
  window: Window;
  user: IUser;
  urls: any[];

  @ViewChild('login') login;
  @ViewChild(LoginComponent) loginComponent;
  @ViewChild('signup') signup;
  
  constructor(
    private viewContainerRef: ViewContainerRef,
    private router: Router,
    private _userService: UserService,
    private _authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.onLoad();
    let token = _authService.retriveToken();
    this.userId = _userService.userId || '';
    this.urls = [
      {name: 'Thông tin cá nhân', url: 'profile', param: this.userId.replace(/['"]+/g, '')},
      {name: 'Cài đặt tài khoản', url: 'settings', param: this.userId.replace(/['"]+/g, '')},
      {name: 'Mở Cửa Hàng', url: 'store'}
    ];
    }

  ngOnInit() {
    this.isAuthenticated = this._userService.getAuthenticated();
    this._userService.getUserById(this.userId)
      .subscribe((data)=> {
         //  this.userName = data. + ' ' + data.json().get("firstName");
          // this.email = data.json().get("email");
          this.user = data;
          this.userName = this.user.lastName + ' ' + this.user.firstName;
          this.email = this.user.email;
      });
  }

  checkIsMobile(width){
    if(width<=768){
      return true;
    }else {
      return false;
    }
  }
  
  redirect(pageName) {
    console.log("redirect works");
    return this.router.navigate([pageName]);
  }
  
  onResize(event) {
    let innerWidth = event.target.innerWidth;
    this.isMobile = this.checkIsMobile(innerWidth);
    return;
  }
  
  onLoad(){
    let innerWidth = window.innerWidth;
    this.isMobile = this.checkIsMobile(innerWidth);
    return;
  }

  // Sign Out
  signOut() {
    console.log("signOut works");
    this._authService.deleteToken();
    window.location.href = "/";
    return true;
  }

}
