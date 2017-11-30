import { Component, Input, OnDestroy, OnInit } from '@angular/core';



@Component({
  selector: 'profile-item-container',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileItemContainerComponent{
  childComponent;
  constructor() {
    this.childComponent = "user-profile";
  }

  setChildComponent(child) {
    this.childComponent = child;
  }
}
