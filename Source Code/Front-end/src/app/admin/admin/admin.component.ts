import { IUser } from './../../shared/models/user';
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
} from '@angular/core';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  // profileItems: ProfileItem[];
  // @ViewChild(ProfileItemContainerComponent) child: ProfileItemContainerComponent; 
  // @ViewChild('admin-item-container') adminItem;
  
  @Input() childComponent;
  constructor(){}

  ngOnInit() {
  
  }

  public loadChildrenComponent(event?) {
    // this.profileItem.setChildComponent(event.target.id);
    console.log(event.target.id);
    this.childComponent = event.target.id;
  }
}
