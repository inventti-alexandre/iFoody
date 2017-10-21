import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'open-store',
  templateUrl: './open-store.component.html',
  styleUrls: ['./open-store.component.scss']
})
export class OpenStoreComponent implements OnInit {

  store: FormGroup;
 

  applyTheme(pop: any) {
    setTimeout(() => {
      pop.show();
    });
  }

  ngOnInit() {
    this.store = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      name: new FormControl(),
      address: new FormControl(),
      // confirmPassword: new FormControl(),
      // DOB: new FormControl(),
      readPolicy: new FormControl(),
    });
  }

  onSubmit() {
  }
}
