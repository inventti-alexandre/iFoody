import { ISearchParam, ISearchResult } from "./../../../shared/models/allModel";
import { imageDefault } from "./../../../constant/global";
import { ActivatedRoute, Params, Route, Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { SearchService } from "./../../../shared/services/search.service";
import { UserService } from "../../../shared/services/user.service";
import * as _ from "lodash";
import { handelImgErro,checkOpenStore } from "../../../shared/services/share-function.service";
declare var searchObject: any;

@Component({
  selector: "search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"],
  providers: [SearchService, UserService]
})
export class SearchBarComponent implements OnInit {
  @Input("searchString") searchString;

  filterDisplay: string;
  districts: any[];
  suggestionList: any[];
  userId: string;
  defaultSuggestionList: any[];
  defaultSuggestionCount;
  defaultPageResult;
  imageDefault: string;
  isNotFound: boolean;
  searchParam: ISearchParam;
  handelImgErro = handelImgErro;
  checkOpenStore = checkOpenStore;

  constructor(
    private router: Router,
    private _searchService: SearchService,
    private _userService: UserService
  ) {
    this.filterDisplay = "Chọn khu vực";
    this.searchString = "";
    this.districts = [
      1,2,3,4,5,6,7,8,9,10,11,12,
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
      searchString: "",
      page: this.defaultPageResult,
      currentLatitude: 0,
      currentLongitude: 0,
      categoriesListId: [],
      districtList: [],
      count: this.defaultSuggestionCount,
      filterOption: {
        location: false,
        categories: false,
        districts: false,
        rating: false
      }
    };
  }
  ngOnInit() {
    searchObject.hide();
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

  handelChangeSearchBar = () => {
    setTimeout(() => {
        this.getSearchPaging();
    }, 1000);
  }

  getSearchPaging = () => {
    let trimSearchString = this.searchString.trim().replace(/ +(?= )/g, "");
    if (trimSearchString !== "") {
      this.suggestionList = [];
      this.isNotFound = false;
      this.searchParam.searchString = trimSearchString;
      return this._searchService.Search(this.searchParam).subscribe(
        (data: Response) => {
          if (data != null) {
            this.suggestionList.push(data);
          }else{
            this.isNotFound = true;
          }
          console.log("search paging result", this.suggestionList);
        },
        err => {}
      );
    }
  };
  setSearchQueryParam = (hide) => {
    if(hide){
      searchObject.hide();
    }
    let districts = this.searchParam.districtList.toString();
    this.router.navigate(["/search"], {
      queryParams: { name: this.searchString, districts: districts, page: this.defaultPageResult}
    });
  }

  chooseDistrict=(event)=>{
    if(event.checked){
      this.searchParam.districtList.push(event.source.value)
    }else{
      for(let i=0;i<this.searchParam.districtList.length;i++){
        if(this.searchParam.districtList[i]==event.source.value){
          this.searchParam.districtList.splice(i, 1);
          break;
        }
      }
    }
    if(this.searchParam.districtList.length>0){
      this.searchParam.filterOption.districts = true;
      this.filterDisplay = 'Bộ lọc (' + this.searchParam.districtList.length + ')';
    }else{
      this.searchParam.filterOption.districts = false;
      this.filterDisplay = "Chọn khu vực";
    }
    this.handelChangeSearchBar();
  }
}
