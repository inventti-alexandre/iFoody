import { forEach } from '@angular/router/src/utils/collection';
import { ISearchParam, ISearchResult } from "./../../../shared/models/allModel";
import { imageDefault } from "./../../../constant/global";
import { ActivatedRoute, Params, Route, Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { SearchService } from "./../../../shared/services/search.service";
import { UserService } from "../../../shared/services/user.service";
import * as _ from "lodash";
import { handelImgErro,checkOpenStore,enCodeUrl,handelImagePath } from "../../../shared/services/share-function.service";
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
  enCode = enCodeUrl;
  handelImagePath = handelImagePath;
  test:boolean

  constructor(
    private router: Router,
    private _searchService: SearchService,
    private _userService: UserService
  ) {
    this.filterDisplay = "Chọn khu vực";
    this.searchString = "";
    this.districts = [
      {value:'quận 1',checked:false, display: 'Quận 1'},
      {value:'quận 2',checked:false, display: 'Quận 2'},
      {value:'quận 3',checked:false, display: 'Quận 3'},
      {value:'quận 4',checked:false, display: 'Quận 4'},
      {value:'quận 5',checked:false, display: 'Quận 5'},
      {value:'quận 6',checked:false, display: 'Quận 6'},
      {value:'quận 7',checked:false, display: 'Quận 7'},
      {value:'quận 8',checked:false, display: 'Quận 8'},
      {value:'quận 9',checked:false, display: 'Quận 9'},
      {value:'quận 10',checked:false, display: 'Quận 10'},
      {value:'quận 11',checked:false, display: 'Quận 11'},
      {value:'quận 12',checked:false, display: 'Quận 12'},
      {value:"quận Bình Thạnh",checked:false, display: 'Quận Bình Thạnh'},
      {value:"quận Tân Bình",checked:false, display: 'Quận Tân Bình'},
      {value:"quận Phú Nhuận",checked:false, display: 'Quận Phú Nhuận'},
      {value:"quận Tân Phú",checked:false, display: 'Quận Tân Phú'},
      {value:"quận Gò Vấp",checked:false, display: 'Quận Gò Vấp'},
      {value:"quận Bình Tân",checked:false, display: 'Quận Bình Tân'},
      {value:"quận Thủ Đức",checked:false, display: 'Quận Thủ Đức'},
      {value:"quận Bình Chánh",checked:false, display: 'Quận Bình Chánh'},
      {value:"quận Nhà Bè",checked:false, display: 'Nhà Bè'},
      {value:"quận Hóc Môn",checked:false, display: 'Hóc Môn'},
      {value:"quận Củ Chi",checked:false, display: 'Củ Chi'},
      {value:"quận Cần Giờ",checked:false, display: 'Cần Giờ'},
    ];
    this.test=false
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
      this.defaultSuggestionList[0].results = this.changeImagePath( this.defaultSuggestionList[0].results);
      this.suggestionList = _.cloneDeep(this.defaultSuggestionList);
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
          this.defaultSuggestionList[0].results = this.changeImagePath( this.defaultSuggestionList[0].results);
          console.log("suggest result", this.defaultSuggestionList[0].results);
          this.suggestionList = _.cloneDeep(this.defaultSuggestionList);
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
            this.suggestionList[0].results = this.changeImagePath( this.suggestionList[0].results);
          }else{
            this.isNotFound = true;
          }
          console.log("search paging result", this.suggestionList);
        },
        err => {}
      );
    }
  }

  setSearchQueryParam = (hide) => {
    if(hide){
      searchObject.hide();
    }
    let districts = this.searchParam.districtList.toString();
    this.router.navigate(["/search"], {
      queryParams: { name: this.searchString, districts: districts, page: this.defaultPageResult}
    });
  }

  resetFilter = ()=>{
    this.searchParam.districtList = [];
    this.searchParam.filterOption.districts = false;
    this.filterDisplay = "Chọn khu vực";
    this.districts.forEach(district=>{
      district.checked = false;
    })
    this.setSearchQueryParam(true);
  }
  chooseDistrict=(event)=>{
    if(!event.checked){
      this.searchParam.districtList.push(event.value);
    }else{
      for(let i=0;i<this.searchParam.districtList.length;i++){
        if(this.searchParam.districtList[i]===event.value){
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
    // this.handelChangeSearchBar();
    console.log("CHECK-BOX", this.districts)
  }
  changeImagePath=(results)=>{
    results.forEach(item=>{
      item.images = handelImagePath(item.images);
    });
    return results;
  }
}
