import { IUser } from './../../../../shared/models/allModel';
import { UserService } from './../../../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
// import {  } from 'ngx-bootstrap/ng2-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { window } from 'rxjs/operators/window';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginModal') public loginModal: ModalDirective;
  
  @Input('user') user: FormGroup;
  isAuthenticated: boolean;
  public modalRef: BsModalRef;
  loading: boolean;
  
  returnUrl: string;
  userId: string;
  userName: string;

  constructor(
    private modalService: BsModalService, 
    private _userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  // Login (or SignIn)
  public SignIn() {
    this.loading = true;
    this._userService.signIn(this.user.value.email, this.user.value.password)
      .subscribe((data: Response) => {
        this.isAuthenticated = true;
        this.hide();
        this.router.navigate([this.returnUrl]);
        alert("Đăng nhập thành công!!!");
        this.reload();
        return this.isAuthenticated;
      }
    );
    return false;
  }

  // Reload page
  reload() {
    console.log("reload work");
    location.reload();
  }
  // Show Modal Login
  public show() {
    this.loginModal.show();
  }

  // Hide Modal Login
  public hide() {
    this.loginModal.hide();
  }

  // checkLogin(user) {
    // this.isAuthenticated = true;
    // this.router.navigate(["/profile"],{queryParams:{id:'1234'}});
  // }

  public openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }

  public openSecondModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
