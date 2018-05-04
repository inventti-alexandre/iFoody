import { ActivatedRoute } from '@angular/router';
import { IUser } from './../../shared/models/allModel';
// import { AdminLayout } from '../admin-layout/admin-layout.component';
// import { AdminProfile } from '../admin-profile/admin-profile.component';
// import { AdminProduct } from '../admin-product/admin-product.component';
// import { AdminStore } from '../admin-store/admin-store.component';
// import { AdminUser } from '../admin-user/admin-user.component';
import { UserService } from '../../shared/services/user.service';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewChildren,
    AfterViewChecked,
} from '@angular/core';
import { Router } from '@angular/router';
import * as apiUrl from '../../constant/apiUrl';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewChecked{
  // profileItems: ProfileItem[];
  // @ViewChild(ProfileItemContainerComponent) child: ProfileItemContainerComponent; 
  // @ViewChild('admin-item-container') adminItem;
  userId: any;
  @Input() childComponent;
  constructor(private router: Router, private activatedRoute: ActivatedRoute){
    this.userId = localStorage.getItem(apiUrl.UserId).replace(/['"]+/g, '');
  }

  ngOnInit() {
    // this.childComponent = 'admin-profile';
  }

  ngAfterViewChecked() {
    this.activatedRoute.params.subscribe(params => {
      setTimeout(() => {
        if(params['option'] === 'profile') {
          this.childComponent = 'admin-profile';
        }
        if(params['option'] === 'stores') {
          this.childComponent = 'admin-store';
        }
        if(params['option'] === 'users') {
          this.childComponent = 'admin-user';
        }
        if(params['option'] === 'products') {
          this.childComponent = 'admin-product';
        }
        
        if(params['option'] === 'users') {
          this.childComponent = 'admin-user';
        }
        if(params['option'] === 'statistic') {
          this.childComponent = 'admin-statistic';
        }
      }, 0);
    });
  }

  loadChildrenComponent(event?) {
    console.log('event.target.id', event.target.id);
    this.childComponent = event.target.id;
    if(event.target.id === 'admin-profile') {
      this.router.navigate(['admin', 'profile']);
    }
    if(event.target.id === 'admin-store') {
      this.router.navigate(['admin', 'stores']);
    }
    if(event.target.id === 'admin-user') {
      this.router.navigate(['admin', 'users']);
    }
    if(event.target.id === 'admin-product') {
      this.router.navigate(['admin', 'products']);
    }
    if(event.target.id === 'admin-statistic') {
      this.router.navigate(['admin', 'statistic']);
    }
  }
}
