// import { MdCheckboxModule } from '@angular/material';
// import { MdButtonModule } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'signup-by-email',
  templateUrl: './signup-by-email.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./signup-by-email.component.scss']
})
export class SignupByEmailComponent implements OnInit{
  user: FormGroup;
  closeResult: string;
    constructor(private modalService: NgbModal) { }
  
    open(content) {
      // this.modalService.open(content, { windowClass: 'dark-modal' });
      this.modalService.open(content);
    }

    ngOnInit() {
      this.user = new  FormGroup({
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
