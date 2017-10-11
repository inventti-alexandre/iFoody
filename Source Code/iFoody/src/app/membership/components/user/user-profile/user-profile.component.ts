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

  constructor(private cdr: ChangeDetectorRef) { }

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
        password: new FormControl(),
        confirmPassword: new FormControl(),
        DOB: new FormControl(),
      });
      this.cdr.detectChanges();
  }

  onSubmit() {
  }

}

