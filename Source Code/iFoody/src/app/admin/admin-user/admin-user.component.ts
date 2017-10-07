import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
