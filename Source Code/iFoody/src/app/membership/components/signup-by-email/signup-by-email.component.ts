import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'signup-by-email',
  templateUrl: './signup-by-email.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./signup-by-email.component.scss']
})
export class SignupByEmailComponent {

  closeResult: string;
  
    constructor(private modalService: NgbModal) { }
  
    open(content) {
      // this.modalService.open(content, { windowClass: 'dark-modal' });
      this.modalService.open(content);
    }
}
