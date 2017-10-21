import { Component, OnInit } from '@angular/core';
import * as global from './../../../constant/global';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  nameApp = global.nameApp;

}
