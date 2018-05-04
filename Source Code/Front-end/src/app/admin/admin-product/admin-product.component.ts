import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  storeName = "Hot & Cold";
  totalProducts: number;
  listProducts =[
    {
      avatar:"https://media.cooky.vn/images/blog-2016/fan-cuong-tra-sua-cung-chua-chac-biet-het-7-su-that-thu-vi-nay-1.jpg",
      name:"Trà sữa trân châu",
      type:"Đồ uống",
      price:"30 000",
      description:"Sản phẩm thích hợp cho sinh viên"
    },
    {
      avatar:"http://www.caffeincas.it/wp/wp-content/uploads/2014/05/caff%C3%A8-espresso.jpg",
      name:"Trà sữa trân châu",
      type:"Đồ uống",
      price:"50 000",
      description:"Sản phẩm thích hợp cho sinh viên"
    },
    {
      avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNjkFs6sdcGdlMCEL-egoth2KEJsZiALmrnXTuHbg_q3evPAQgrA",
      name:"Trà sữa trân châu",
      type:"Đồ uống",
      price:"50 000",
      description:"Sản phẩm thích hợp cho sinh viên"
    },
    {
      avatar:"https://jamja.vn/blog/wp-content/uploads/2017/10/tra-sua-hot-and-cold-menu-8.jpg",
      name:"Trà sữa trân châu",
      type:"Đồ uống",
      price:"20 000",
      description:"Sản phẩm thích hợp cho sinh viên"
    },
    {
      avatar:"https://hotdeal.vn/images/uploads/2017/Th%C3%A1ng%203/03/320476/320476-set-mi-y-xien-que-hong-tra-body%20%289%29.jpg",
      name:"Trà sữa trân châu",
      type:"Đồ uống",
      price:"50 000",
      description:"Sản phẩm thích hợp cho sinh viên"
    },
    {
      avatar:"http://channel.mediacdn.vn//prupload/164/2015/05/img_201505151319006622.jpg",
      name:"Trà sữa trân châu",
      type:"Đồ uống",
      price:"50 000",
      description:"Sản phẩm thích hợp cho sinh viên"
    },
    {
      avatar:"http://media.phunutoday.vn/files/upload_images/2015/04/16/cach-lam-che-thai-ngon-4-phunutoday-vn.jpg",
      name:"Trà sữa trân châu",
      type:"Đồ uống",
      price:"50 000",
      description:"Sản phẩm thích hợp cho sinh viên"
    },
    {
      avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHwfMBdwYvs1KagdIOvIuWdhrPzKFYLDQN6HUvG22UeTcnNj9",
      name:"Trà sữa trân châu",
      type:"Đồ uống",
      price:"50 000",
      description:"Sản phẩm thích hợp cho sinh viên"
    },
    {
      avatar:"http://www.caffeincas.it/wp/wp-content/uploads/2014/05/caff%C3%A8-espresso.jpg",
      name:"Trà sữa trân châu",
      type:"Đồ uống",
      price:"50 000",
      description:"Sản phẩm thích hợp cho sinh viên"
    },
    {
      avatar:"http://www.caffeincas.it/wp/wp-content/uploads/2014/05/caff%C3%A8-espresso.jpg",
      name:"Trà sữa trân châu",
      type:"Đồ uống",
      price:"50 000",
      description:"Sản phẩm thích hợp cho sinh viên"
    },
  ];
  constructor(private _authService: AuthService) {
    this.totalProducts = 0;
   }

  ngOnInit() {
    this._authService.getCountOfTotalProducts()
      .subscribe(result => {
        console.log('result Products', result);
        this.totalProducts = result;
      });

    this._authService.getAllUsers()
      .subscribe(data => {
        console.log('getAllUsers Data return', data);
        this.listProducts = [];
        this.listProducts.push(data);
      });
  }

}
