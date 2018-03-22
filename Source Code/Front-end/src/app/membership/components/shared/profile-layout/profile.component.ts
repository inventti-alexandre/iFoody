// import { ProfileItemContainerComponent } from './profile-item-container';
import { ProfileService } from './../../../services/profile.service';
// import { ProfileItem } from './profile-item';
import { ProfileChildren } from '../../../models/profileChildren';
import { FavoriteListComponent } from './../../user/favorite-list/favorite-list.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UserProfileComponent } from './../../user/user-profile/user-profile.component';
import { componentFactoryName } from '@angular/compiler';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ProfileDirective } from '../../../directives/profile.directive';
import { UserService } from '../../../../shared/services/user.service';
import * as apiUrl from '../../../../constant/apiUrl';
import { setTimeout } from 'timers';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit{
  // profileItems: ProfileItem[];
  // @ViewChild(ProfileItemContainerComponent) child: ProfileItemContainerComponent;
  userName: any;
  favoriteList = "favorite-list";
  // @ViewChild('profile-item-container') profileItem;
  @Input() childComponent;
  constructor(
    private _profileService: ProfileService,
    private _userService: UserService ,
    private activatedRoute: ActivatedRoute
  ) {
    this._userService.getUserById(localStorage.getItem(apiUrl.UserId))
      .subscribe(response => {
        setTimeout( () => {
          this.userName = response.lastName + ' ' + response.firstName;
        }, 0);
      });
    
  }

  ngOnInit() {
    // this.profileItems = this.profileService.getProfileItem();
    this.childComponent = 'user-profile';
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      if(params['option'] === 'favorite') {
        console.log("in if");
          this.childComponent = this.favoriteList;
      }
        console.log("out if");
      
    });
  }

  loadChildrenComponent(event?) {
    // this.profileItem.setChildComponent(event.target.id);
    this.childComponent = event.target.id;
    console.log(event.target);
  }
}
