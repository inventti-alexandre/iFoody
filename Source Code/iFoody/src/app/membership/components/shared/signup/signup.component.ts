import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, Inject, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser'
@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  user: FormGroup;
  // closeResult: string;
  @ViewChild('signupModal') signupModal;
  @ViewChild('signupByEmailModal') signupByEmailModal;
  body = document.getElementsByTagName('body')[0];
  
  
 
  
  
  isSignUpByEmailModal: boolean;
  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private renderer: Renderer2 ) { 
    // this.renderer.addClass(document.body, 'modal-open');
    // let body = document.getElementsByTagName('body')[0];
    
  }


  public show() {
    this.signupModal.show();
  }


  public hide() {
    this.signupModal.hide();
    
  }

  public showSecondModal() {
    // this.body.classList.add("my-modal-open"); //remove the class  
    this.signupByEmailModal.show();
    
  }

  public hideSecondModal() {
    this.signupByEmailModal.hide();
    console.log("remove");
  }

  ngOnDestroy () {
    this.body.classList.remove("my-modal-open");
    console.log("remove");
    // this.body.classList.remove("modal-open");
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }



  public openSecondModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
      password: new FormControl(),
      confirmPassword: new FormControl(),
      DOB: new FormControl(),
      readPolicy: new FormControl(),
    });
  }

  onSubmit() {
  }
}
