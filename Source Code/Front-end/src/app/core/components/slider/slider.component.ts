import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
slider: any[];
  constructor() { 
    this.slider=[
      {
        src: "http://img.taste.com.au/hegWu1Xh/taste/2016/11/banh-xeo-crispy-pancakes-77516-1.jpeg"
        , name:"Bánh xèo"
        , title:"Vị miền trung ngon nhất Sài Gòn"
      },
      {
        src: "http://static.diadiemanuong.com/review/74316/520.jpg"
        , name:"Lẩu Hải Sản"
        , title:"Lẩu 4 người với công thức đặc biệt mùa Tết"
      },
      {
        src: "https://i.ytimg.com/vi/UfEyEag9MCE/maxresdefault.jpg"
        , name: "Bánh Tráng Trộn"
        , title:"Cùng thư giãn bên bạn bè với món ăn vặt trất nhất quả đất"
      },
      {
        src: "http://sotaynauan.com/wp-content/uploads/2016/11/cach-lam-canh-ga-chien-mam-1.jpg"
        , name: "Gà Chiên Cay Xé Lưỡi"
        , title:"Thử độ cay của bạn xem tới đâu nào!"
      },
      {
        src: "http://truonganvi.com/uploads/Cam-nang/cafe1.jpg"
        , name: "Cafe rang xay nguyên chất"
        , title:"Hương thơm nồng nàn cho một ngày thật tỉnh táo"
      },
      {
        src: "https://img.grouponcdn.com/deal/41nhFG9HKyfcAW3Q3o5z/YC-2048x1229/v1/c700x420.jpg"
        , name: "Trà Sữa 7 Màu"
        , title:"7 vị trà đi cùng 7 màu sắc khác nhau cho bạn một trải nghiệm thật trẻ trung"
      }
    ];
  }

  ngOnInit() {
  }
 
}
