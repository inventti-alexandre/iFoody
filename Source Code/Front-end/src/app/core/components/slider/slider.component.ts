import { forEach } from '@angular/router/src/utils/collection';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { SearchService } from "./../../../shared/services/search.service";
import { UserService } from "../../../shared/services/user.service";
import { handelImgErro,handelImagePath,enCodeUrl } from "../../../shared/services/share-function.service";
import * as _ from "lodash";

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [SearchService, UserService]
})
export class SliderComponent implements OnInit {
  slider: any[];
  linkImg: any[];
  userId: string;
  defaultSuggestionList: any[];
  defaultSuggestionCount: number;
  suggestionList: any[];
  handelImgErro = handelImgErro;
  handelImagePath = handelImagePath;
  enCode = enCodeUrl;
  loading: boolean;

  constructor(
    private _searchService: SearchService,
    private _userService: UserService
  ) {
    this.userId = _userService.userId || "";
    this.defaultSuggestionList = [];
    this.defaultSuggestionCount = 5;
    this.suggestionList = [];
    this.slider=[];
    this.loading = false;
    this.linkImg = [
      "../../../../assets/images/core/slide1.jpg",
      "../../../../assets/images/core/slide2.jpg",
      "../../../../assets/images/core/slide3.jpg",
      "../../../../assets/images/core/slide4.jpg",
      "../../../../assets/images/core/slide5.jpg",
    ]
    // this.slider=[
    //   {
    //     src: "http://img.taste.com.au/hegWu1Xh/taste/2016/11/banh-xeo-crispy-pancakes-77516-1.jpeg"
    //     , name:"Bánh xèo"
    //     , title:"Vị miền trung ngon nhất Sài Gòn"
    //   },
    //   {
    //     src: "http://static.diadiemanuong.com/review/74316/520.jpg"
    //     , name:"Lẩu Hải Sản"
    //     , title:"Lẩu 4 người với công thức đặc biệt mùa Tết"
    //   },
    //   {
    //     src: "https://i.ytimg.com/vi/UfEyEag9MCE/maxresdefault.jpg"
    //     , name: "Bánh Tráng Trộn"
    //     , title:"Cùng thư giãn bên bạn bè với món ăn vặt trất nhất quả đất"
    //   },
    //   {
    //     src: "http://sotaynauan.com/wp-content/uploads/2016/11/cach-lam-canh-ga-chien-mam-1.jpg"
    //     , name: "Gà Chiên Cay Xé Lưỡi"
    //     , title:"Thử độ cay của bạn xem tới đâu nào!"
    //   },
    //   {
    //     src: "http://truonganvi.com/uploads/Cam-nang/cafe1.jpg"
    //     , name: "Cafe rang xay nguyên chất"
    //     , title:"Hương thơm nồng nàn cho một ngày thật tỉnh táo"
    //   },
    //   {
    //     src: "https://img.grouponcdn.com/deal/41nhFG9HKyfcAW3Q3o5z/YC-2048x1229/v1/c700x420.jpg"
    //     , name: "Trà Sữa 7 Màu"
    //     , title:"7 vị trà đi cùng 7 màu sắc khác nhau cho bạn một trải nghiệm thật trẻ trung"
    //   }
    // ];
  }

  ngOnInit() {
    this.getSuggestionList();
  }
  setSlider=(data)=>{
    for(let i=0;i<this.defaultSuggestionCount;i++){
      this.slider.push({
        // src: data[i].images[0].path,
        src: this.linkImg[i],
        name: data[i].store.name,
        id: data[i].store.id,
        title: data[i].store.address + ', ' + data[i].store.district
      })
    }
  }
  getSuggestionList = () => {
    if (this.defaultSuggestionList.length === 0) {
      if (this.userId !== "") {
        this.getSuggestionListByUserId(
          this.userId,
          this.defaultSuggestionCount
        );
      } else {
        this.getSuggestionListByRating(this.defaultSuggestionCount);
      }
    } else {
      this.defaultSuggestionList[0].results = this.changeImagePath( this.defaultSuggestionList[0].results);
      this.suggestionList = _.cloneDeep(this.defaultSuggestionList);
      this.setSlider(this.suggestionList[0].results)
    }
  }
  getSuggestionListByRating = (count?) => {
    return this._searchService
      .SuggestListByRating(count)
      .subscribe((data: Response) => {
        if (data !== null) {
          this.defaultSuggestionList.push(data);
          this.defaultSuggestionList[0].results = this.changeImagePath( this.defaultSuggestionList[0].results);
          this.suggestionList = _.cloneDeep(this.defaultSuggestionList);
          this.setSlider(this.suggestionList[0].results)
          console.log("suggest default", this.suggestionList);
        } else {
          console.log("suggest result empty");
        }
      });
  }

  getSuggestionListByUserId = (userId, count?) => {
    return this._searchService
      .SuggestListByUserId(userId, count)
      .subscribe((data: Response) => {
        if(data.status===404){
          this.getSuggestionListByRating(this.defaultSuggestionCount);
        }else{
          this.defaultSuggestionList.push(data);
          this.defaultSuggestionList[0].results = this.changeImagePath( this.defaultSuggestionList[0].results);
          this.suggestionList = _.cloneDeep(this.defaultSuggestionList);
          this.setSlider(this.suggestionList[0].results)
          console.log("suggest result", this.suggestionList);
        }
      });
  }
  changeImagePath=(results)=>{
    results.forEach(item=>{
      item.images = handelImagePath(item.images);
    });
    return results;
  }

}
