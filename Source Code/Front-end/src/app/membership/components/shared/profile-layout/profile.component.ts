import { ProfileItemContainerComponent } from './profile-item-container';
import { ProfileService } from './../../../services/profile.service';
import { ProfileItem } from './profile-item';
import { ProfileChildren } from '../../../models/profileChildren';
import { WishListComponent } from './../../user/wish-list/wish-list.component';
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

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit{
  // profileItems: ProfileItem[];
  // @ViewChild(ProfileItemContainerComponent) child: ProfileItemContainerComponent; 
  @ViewChild('profile-item-container') profileItem;
  @Input() childComponent;
  constructor(private profileService: ProfileService){}

  ngOnInit() {
    // this.profileItems = this.profileService.getProfileItem();
  }

  public loadChildrenComponent(event?) {
    // this.profileItem.setChildComponent(event.target.id);
    console.log(event.target.id);
    this.childComponent = event.target.id;
  }
}
