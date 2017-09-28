// import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: FormGroup;
  closeResult: string;
  public modalRef: BsModalRef;
  // bsConfig: Partial<BsDatepickerConfig>;
  // colorTheme = 'theme-green';

  constructor (private modalService: BsModalService,) {
  }

  public openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }

  public openSecondModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  applyTheme(pop: any) {
    // create new object on each property change
    // so Angular can catch object reference change
    // this.bsConfig = Object.assign({}, {containerClass: this.colorTheme});
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
      readPolicy: new FormControl(),


    });
  }

  onSubmit() {

  }

}
