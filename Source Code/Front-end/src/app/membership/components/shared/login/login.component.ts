import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/ng2-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginModal') public loginModal: ModalDirective;
  @Input('user') user: FormGroup;
  private isAuthenticated: boolean;
  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  public show() {
    this.loginModal.show();
  }
  public hide() {
    this.loginModal.hide();
  }

  checkLogin(user) {
    // this.isAuthenticated = true;
    this.router.navigate(["/profile"],{queryParams:{id:'1234'}});
  }
  // public openModal(template: TemplateRef<any>) {
  //     this.modalRef = this.modalService.show(template);
  // }

  // public openSecondModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }

}
