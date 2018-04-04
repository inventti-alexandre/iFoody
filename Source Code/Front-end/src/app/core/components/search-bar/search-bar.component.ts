import { ISearchParam } from './../../../shared/models/allModel';
import { imageDefault } from "./../../../constant/global";
import { ActivatedRoute, Params, Route, Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { SearchService } from "./../../../shared/services/search.service";
import { UserService } from "../../../shared/services/user.service";
import * as _ from "lodash";
declare var searchObject: any;

@Component({
  selector: "search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"],
  providers: [SearchService, UserService]
})
export class SearchBarComponent implements OnInit {
  @Input("searchString") searchString;
  @Input("area") area;

  districts: any[];
  suggestionList: any[];
  userId: string;
  defaultSuggestionList: any[];
  defaultSuggestionCount;
  defaultPageResult;
  imageDefault: string;
  isNotFound: boolean;
  searchParam:ISearchParam;

  constructor(
    private router: Router,
    private _searchService: SearchService,
    private _userService: UserService
  ) {
    this.searchString = "";
    this.districts = [
      "Bình Thạnh",
      "Tân Bình",
      "Phú Nhuận",
      "Tân Phú",
      "Gò Vấp",
      "Bình Tân",
      "Thủ Đức",
      "Bình Chánh",
      "Nhà Bè",
      "Hóc Môn",
      "Củ Chi",
      "Cần Giờ"
    ];
    this.suggestionList = [];
    this.userId = _userService.userId || "";
    this.defaultSuggestionList = [];
    this.defaultSuggestionCount = 5;
    this.defaultPageResult = 1;
    this.imageDefault = imageDefault;
    this.isNotFound = false;
    this.searchParam = {
      "searchString": "",
      "page": this.defaultPageResult,
      "currentLatitude": 0,
      "currentLongitude": 0,
      "categoriesListId": [],
      "districtList": [],
      "count": this.defaultSuggestionCount,
      "filterOption":{
        "location": false,
        "categories":false,
        "districts":false,
        "rating": false
      }
    }
  }
  ngOnInit() {
    searchObject.hide();
    // this.getSuggestionListByRating(5);
    // this.getSuggestionListByUserId("cc736f75-4b3f-457b-9110-2272455e282d");
  }
  getSuggestionList = () => {
    if (this.defaultSuggestionList.length === 0) {
      if (this.userId !== "") {
        this.getSuggestionListByUserId(this.userId,this.defaultSuggestionCount);
      } else {
        this.getSuggestionListByRating(this.defaultSuggestionCount);
      }
    } else {
      this.suggestionList = _.cloneDeep(this.defaultSuggestionList);
    }
  }

  getSuggestionListByRating = (count?) => {
    return this._searchService
      .SuggestListByRating(count)
      .subscribe((data: Response) => {
        if (data !== null) {
          this.defaultSuggestionList.push(data);
          this.suggestionList = _.cloneDeep(this.defaultSuggestionList);
          console.log("suggest default", this.defaultSuggestionList[0].results);
        } else {
          console.log("suggest result empty");
        }
      });
  }

  getSuggestionListByUserId = (userId, count?) => {
    return this._searchService
      .SuggestListByUserId(userId, count)
      .subscribe((data: Response) => {
        if (data !== null) {
          this.defaultSuggestionList.push(data);
          this.suggestionList = _.cloneDeep(this.defaultSuggestionList);
          console.log("suggest result", this.defaultSuggestionList[0].results);
        } else {
          console.log("suggest result empty");
        }
      });
  }

  checkOpenStore = (openHour, closeHour) => {
    let openHourConvert = openHour.split(":");
    let openTimeSeconds =
      +openHourConvert[0] * 60 * 60 + +openHourConvert[1] * 60;

    let closeHourConvert = closeHour.split(":");
    let closeTimeSeconds =
      +closeHourConvert[0] * 60 * 60 + +closeHourConvert[1] * 60;

    let currentTime = new Date();
    let currentSeconds =
      currentTime.getHours() * 60 * 60 + currentTime.getMinutes() * 60;

    let isOpen = false;
    if (currentSeconds > openTimeSeconds && currentSeconds < closeTimeSeconds) {
      isOpen = true;
    }
    // console.log(currentSeconds - openTimeSeconds);

    return isOpen;
  }

  getSearchPaging() {
    let trimSearchString = this.searchString.trim().replace(/ +(?= )/g,'');
    if(trimSearchString!==""){
      this.searchParam.searchString = trimSearchString;
      return this._searchService
      .Search(this.searchParam)
      .subscribe(
        (data: Response) => {
          if(data==null){
            this.suggestionList = [];
            this.isNotFound = true;
          }else{
            this.suggestionList.splice(0, 1, data);
            this.isNotFound = false;
          }
          console.log("search paging result", this.suggestionList);
        },
        err => {
          this.suggestionList = [];
          this.isNotFound = true;
        }
      );
    }
  }

  setSearchQueryParam=()=> {
    this.router.navigate(["/search"], {
      queryParams: { name: this.searchString,area: this.area}
    });
  }
}
