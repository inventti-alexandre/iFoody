import { Component, OnInit, Input } from '@angular/core';
import { ProfileChildren } from '../../../models/profileChildren';

@Component({
  selector: 'wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit, ProfileChildren {
  
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
