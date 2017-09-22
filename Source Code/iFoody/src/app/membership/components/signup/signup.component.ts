import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  closeResult: string;
  
    constructor(private modalService: NgbModal) {}
  
    open(content) {
      // this.modalService.open(content, { windowClass: 'dark-modal' });
      this.modalService.open(content);      
    }

}
