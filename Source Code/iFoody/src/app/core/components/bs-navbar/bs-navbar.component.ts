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
    //console.log("tset", window.outerWidth);
  }

  ngOnInit() {
  }
  
  onResize(event) {
    let innerWidth = event.target.innerWidth;
    if (innerWidth >= 768) {
      this.isMobile = false;
      return;
    }
    this.isMobile = true;
    return;
  }
}
