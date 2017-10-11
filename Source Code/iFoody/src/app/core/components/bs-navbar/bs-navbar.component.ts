import { LoginComponent } from './../../../membership/components/shared/login/login.component';
import * as global from './../../../constant/global';
import { Component, HostListener, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';

@HostListener('window:resize', ['$event'])
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  isMobile= false;
  nameApp = global.nameApp;

  @ViewChild('login') login;
  @ViewChild('signup') signup;
  
  constructor(private viewContainerRef: ViewContainerRef, private route: Router) {
    this.onLoad();
  }

  ngOnInit() {
  }

  checkIsMobile(width){
    if(width<=768){
      return true;
    }else {
      return false;
    }
  }
  
  redirect(pageName) {
    this.route.navigate([pageName]);
    console.log("test");
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

  

  // public openModal() {
  //   this.yourModal.open();
  // }
}
