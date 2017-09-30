import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: FormGroup;
  // closeResult: string;
  //public modalRef: BsModalRef;

  constructor () {}


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
  }

  onSubmit() {
  }

}
