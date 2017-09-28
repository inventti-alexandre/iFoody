import { BsModalService } from 'ngx-bootstrap/modal';
import { MatInputModule } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
// import { ModalDismissReasons, NgbDatepicker, NgbDatepickerModule, NgbModal,  } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'signup-by-email',
  templateUrl: './signup-by-email.component.html',
  styleUrls: ['./signup-by-email.component.scss']
})
export class SignupByEmailComponent implements OnInit {
  user: FormGroup;
  closeResult: string;
  public modalRef: BsModalRef;
  constructor (private modalService: BsModalService) {}
  //constructor(private modalService: NgbModal) { }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  // open(content) {
  //   // this.modalService.open(content, { windowClass: 'dark-modal' });
  //   this.modalService.open(content);
  // }

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
