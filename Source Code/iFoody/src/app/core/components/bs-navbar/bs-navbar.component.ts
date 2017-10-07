import * as global from './../../../constant/global';
import { Component, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';

@HostListener('window:resize', ['$event'])
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  isMobile= false;
  nameApp = global.nameApp;
  constructor() {
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
  
  onResize(event) {
    let innerWidth = event.target.innerWidth;
    this.isMobile = this.checkIsMobile(innerWidth);
    return;
  }
  onLoad(){
    let innerWidth = window.innerWidth;
    //console.log("onload", innerWidth);
    this.isMobile = this.checkIsMobile(innerWidth);
    return;
  }
}
