import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../../shared/services/user.service';
import { ProfileChildren } from '../../../models/profileChildren';
import { IUser } from './../../../../shared/models/allModel';
import { FormGroup, FormControl } from '@angular/forms';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as apiUrl from '../../../../constant/apiUrl';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, ProfileChildren {
  user: FormGroup;
  @Input() data: any;
  userId: string;
  userIdKey: string;
  genderDisplay: string;

  constructor(private cdr: ChangeDetectorRef, private _userService: UserService, private activatedRoute: ActivatedRoute) {
    this.userIdKey = apiUrl.UserId;
    this.userId = localStorage.getItem(this.userIdKey);
   }

  applyTheme(pop: any) {
    setTimeout(() => {
      pop.show();
    });
  }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl(),
      gender: new FormControl(),
      lastname: new FormControl(),
      firstname: new FormControl(),
      birthday: new FormControl(),
    });
    
    this._userService.getUserById(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(u => {
          this.user.setValue({
            email: u.email,
            lastname: u.lastName,
            firstname: u.firstName,
            gender: u.gender,
            birthday: u.birthday,
          });
        this.genderDisplay = (this.user.get("gender").value === 1)  ? "Nam" : "Nữ"; }
      );
      
    this.cdr.detectChanges();
  }

  onSubmit() {
    console.log("OnSUbmit works");
    this._userService.updateUser(this.userId, this.user.value)
      .subscribe(data => {
        this.user = data;
        alert("Cập nhật thành công.");
      });
  }

}

