import { UserId } from './../../../../constant/apiUrl';
import { StoreProfileComponent } from './../../store/store-profile/store-profile.component';
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
    OnChanges,
    AfterViewChecked,
} from '@angular/core';
import { ProfileDirective } from '../../../directives/profile.directive';
import { UserService } from '../../../../shared/services/user.service';
import * as apiUrl from '../../../../constant/apiUrl';
import { setTimeout } from 'timers';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StoreService } from '../../../../shared/services/store.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit, AfterViewChecked{
  user: any;
  userId: any;
  userName: any;
  favoriteList = "favorite-list";
  storeId: any;
  store: any;
  query_params: Params;
  @Input() childComponent;

  constructor(
    private _profileService: ProfileService,
    private _userService: UserService ,
    private _storeService: StoreService ,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this._userService.getUserById(localStorage.getItem(apiUrl.UserId))
      .subscribe(response => {
        setTimeout( () => {
          this.user = response;
          this.userName = response.lastName + ' ' + response.firstName;
        }, 0);
        this._storeService.GetStoreByUserId(response.id)
            .subscribe(result => {
              this.storeId = result.id;
              this.store = result;
            });
      });
   
    this.userId = localStorage.getItem(apiUrl.UserId).replace(/['"]+/g, '');
  }

  ngOnInit() {
    this.childComponent = 'user-profile';
  }

  ngAfterViewChecked() {
    this.activatedRoute.params.subscribe(params => {
      if(params['option'] === 'overview') {
        this.childComponent = 'user-profile';
      }
      if(params['option'] === 'favorite-list') {
        this.childComponent = 'favorite-list';
      }
      if(params['option'] === 'store-profile') {
        this.childComponent = 'store-profile';
      }
      
    });
  }
  loadChildrenComponent(event?) {
    this.childComponent = event.target.id;
    if(event.target.id === 'overview') {
      this.router.navigate(['profile', this.userId, 'overview']);
    }
    if(event.target.id === 'favorite-list') {
      this.router.navigate(['profile', this.userId, 'favorite-list']);
    }
    if(event.target.id === 'store-profile') {
      this.router.navigate(['profile', this.userId, 'store-profile']);
    }
  }
}
