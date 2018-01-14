import { FavoriteListComponent } from './../components/user/favorite-list/favorite-list.component';
import { ChangePasswordComponent } from '../components/shared/change-password/change-password.component';
import { ResetPasswordComponent } from '../components/shared/reset-password/reset-password.component';
import { UserProfileComponent } from './../components/user/user-profile/user-profile.component';
// import { ProfileItem } from './../components/shared/profile-layout/profile-item';
import { Injectable } from '@angular/core';
@Injectable()
export class ProfileService {

  getProfileItem() {
    return [
      // new ProfileItem(UserProfileComponent, null),
      // new ProfileItem(ResetPasswordComponent, null),
      // new ProfileItem(ChangePasswordComponent, null),
      // new ProfileItem(FavoriteListComponent, null),

    ];
  }

}
