import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../../shared/services/user.service';
import { IUser } from './../../../../shared/models/user';
import { ProfileChildren } from '../../../models/profileChildren';
import { FormGroup, FormControl } from '@angular/forms';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, ProfileChildren {
  user: FormGroup;
  @Input() data: any;

  constructor(private cdr: ChangeDetectorRef, private _userService: UserService, private activatedRoute: ActivatedRoute) {
    
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
          console.log(this.user); }
        );
       
        // this.user.value(
          // {email: getUser.},);
      this.cdr.detectChanges();
  }

  onSubmit() {
  }

}

