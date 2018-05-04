import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  totalUsers: number;
  listUsers=[
    {
      name:"Meo Nguyen",
      email:"meonguyen@gmail.com",
      day:"22/12/2012",
    },
    {
      name:"Tuan Nguyen",
      email:"tuannguyen@gmail.com",
      day:"30/08/2012",
    },
    {
      name:"Ha Phan",
      email:"hapham@gmail.com",
      day:"05/12/2012",
    },
    {
      name:"Tuti",
      email:"toto@gmail.com",
      day:"22/05/2012",
    },
    {
      name:"Nhac Nguyen",
      email:"nguyen@gmail.com",
      day:"28/12/2012",
    },
    {
      name:"Thanh Nguyen",
      email:"meonguyen@gmail.com",
      day:"22/12/2012",
    },
    {
      name:"Le Nguyen",
      email:"meonguyen@gmail.com",
      day:"22/12/2012",
    },
    {
      name:"Meo Nguyen",
      email:"Ngoannguyen@gmail.com",
      day:"08/12/2012",
    },    {
      name:"Meo Nguyen",
      email:"meonguyen@gmail.com",
      day:"22/12/2012",
    },
    {
      name:"Meo Nguyen",
      email:"meonguyen@gmail.com",
      day:"22/12/2012",
    },
    {
      name:"Meo Nguyen",
      email:"meonguyen@gmail.com",
      day:"22/12/2012",
    }
  ];
  constructor(private _authService: AuthService) { 
    this.totalUsers = 0;
  }

  ngOnInit() {
    this._authService.getCountOfTotalUsers()
      .subscribe(result => {
        console.log('result USers', result);
        this.totalUsers = result;
      });
    
    this._authService.getAllUsers()
      .subscribe(data => {
        console.log('getAllUsers Data return', data);
        this.listUsers = [];
        this.listUsers.push(data);
      });
  }

}
