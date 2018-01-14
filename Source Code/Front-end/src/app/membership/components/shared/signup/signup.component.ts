import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { IUser } from '../../../../shared/models/allModel';
import { UserService } from '../../../../shared/services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, Inject, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { window } from 'rxjs/operators/window';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  userForm: FormGroup; 
  user: IUser;  // assign userForm to this variable, transform to UserService
  @ViewChild('signupModal') public signupModal: ModalDirective;
  // @ViewChild('signupByEmailModal') public signupByEmailModal: ModalDirective;
  bsValue: Date = new Date(); // Ngx-bootstrap variableto get birthday value
  maxDate = new Date(2002, 1, 1);
  body = document.getElementsByTagName('body')[0];
  returnUrl;

  isSignUpByEmailModal: boolean;
  public modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    // private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService ) { 
    // this.renderer.addClass(document.body, 'modal-open');
    // let body = document.getElementsByTagName('body')[0];
    console.log(this.maxDate);
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      email: new FormControl(),
      lastName: new FormControl(),
      firstName: new FormControl(),
      gender: new FormControl(),
      birthday: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      readPolicy: new FormControl(),
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * SignUp
   */
  public signup() {
    
  }

  public show() {
    console.log("show works");
    this.signupModal.show();
    // document.getElementsByClassName("modal")[0].setAttribute('style','display:block');
    
  }


  public hide() {
    this.signupModal.hide();
  }

  public showSecondModal() {
   // this.signupModal.hide();
  }

  public hideSecondModal() {
    // this.signupByEmailModal.hide();
    // console.log("remove");
  }

  ngOnDestroy () {
    this.body.classList.remove("my-modal-open");
    console.log("remove");
    // this.body.classList.remove("modal-open");
  }

  // public openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }



  public openSecondModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  applyTheme(pop: any) {
    setTimeout(() => {
      pop.show();
    });
  }

  
  onSubmit() {
    if(!this.userForm.valid) {
      return this.userForm.reset();
    }
    if(!this.userForm.get('readPolicy').value) {
      return this.userForm.reset();
    }
    if(this.userForm.get('password').value !== this.userForm.get('confirmPassword').value) {
      return this.userForm.reset();
    }
    this.user = this.userForm.value;
    console.log(this.user);
    // this.user.lastName = this.userForm.get('lastName').value;
    // this.user.firstName = this.userForm.get('firstName').value;
    // this.user.email = this.userForm.get('email').value;
    // this.user.birthday = this.bsValue;
    // this.user.password = this.userForm.get('password').value;
    // this.user.gender = this.userForm.get('gender').value;
    // this.user.hasStore = false;

    this._userService.signUp(this.user)
      .subscribe(data => {
        this.hide();
        alert("Đăng ký thành công!!!");
        this._userService.signIn(this.userForm.get('email').value, this.userForm.get("password").value)
          .subscribe((response: Response) => {
            console.log("tsst");
            this.router.navigate([this.returnUrl]);
            this.reload();
          });
      });
  }

  reload() {
    console.log("reload work");
    location.reload();
  }
  
  calculateAge(value: Date) {
    // let today = new Date(Date.now());
    // let age = Math.abs(today.getFullYear() - this.bsValue.getFullYear());
    // console.log(age);
  }
}
