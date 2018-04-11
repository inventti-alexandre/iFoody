import { forEach } from '@angular/router/src/utils/collection';
import { ISearchParam } from './../../../shared/models/allModel';
import { SearchService } from './../../../shared/services/search.service';
import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd  } from '@angular/router';
import {scrollTop} from './../../../shared/services/share-function.service';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  providers: [SearchService]
})
export class SearchResultComponent implements OnInit {
  addressList: string[]; // To get string Address List, like  ['268 Le Lai', '192 Ly Thai To']
  targetPage: number; // Value get from Bs-Pagination
  storeIds: any[];
  scrollTop = scrollTop;

  public products: any[];
  public initPage;
  public totalPage;
  public initCount;
  public searchParam: ISearchParam;
  public isLoading: boolean;

  constructor(private _searchService: SearchService, private router: ActivatedRoute, private router1: Router) {
    this.initPage = 1;
    this.totalPage = 0;
    this.initCount = 20;
    this.isLoading = true;
    this.initDefautlValue();
  }

  ngOnInit() {
    this.getParam();
    this.scrollTop(this.router1);
  }

  initDefautlValue=()=>{
    this.searchParam = {
      "searchString": "",
      "page": this.initPage,
      "currentLatitude": 0,
      "currentLongitude": 0,
      "categoriesListId": [],
      "districtList": [],
      "count": this.initCount,
      "filterOption":{
        "location": false,
        "categories":false,
        "districts":false,
        "rating": false
      }
    }
    this.products = [];
    this.storeIds=[];
  }
  setDistrictFilterOption=()=>{
    if(this.searchParam.districtList.length>0){
      this.searchParam.filterOption.districts = true;
    }else{
      this.searchParam.filterOption.districts = false;
    }
  }
  setStoreIds=(result)=>{
    this.storeIds=[];
    result.forEach(item=>{
      this.storeIds.push(item.store.id);
    })
  }
  getSearchPaging(targetPage) {
    this.isLoading = true;
    if(this.searchParam.searchString != "") {
      this.searchParam.page = targetPage;
      this.setDistrictFilterOption();
      return this._searchService.Search(this.searchParam)
        .subscribe((data: Response) => {
          if(data!==null){
            if(this.products.length!==0){
              this.products.splice(0,1,data);
            }else{
              this.products.push(data);
            }
            this.isLoading = false;
            this.totalPage =this.products[0].totalPage;
            this.setStoreIds(this.products[0].results);
            console.log("page",this.products);
          }else{
            this.router1.navigate(["/search/notResult"]);
          }
        });
    }else{
      this.router1.navigate(["/search/notResult"]);
    }
  }
  getParam=()=>{
    this.router.queryParams.subscribe((params: Params) => {
      if(params['name']!==this.searchParam.searchString){
        this.initDefautlValue();
      }
      this.searchParam.searchString = params['name']?params['name']:"";
      if(params['districts']){
        let districts = params['districts'].split(",");
        this.searchParam.districtList = districts;
      }
      this.initPage = params['page'];
      this.getSearchPaging(this.initPage);
    });
  }
  routerSearch=(page)=>{
    let districts = this.searchParam.districtList.toString();
    let filterByLocation = this.searchParam.filterOption.location.toString();
    let filterByRating = this.searchParam.filterOption.rating.toString();
    let filterByCategories = this.searchParam.categoriesListId.length.toString();
    this.router1.navigate(["/search"], {
      queryParams: { name: this.searchParam.searchString, districts: districts, filterByLocation: filterByLocation, filterByRating: filterByRating, filterByCategories: filterByCategories, page: page}
    });
    // this.getParam();
  }
  seeMore(targetPage, totalPage){
    if(targetPage<=totalPage){
      this.routerSearch(this.targetPage);
    }
  }

  getTargetPage(value: any) {
    this.targetPage = parseInt(value);
    this.seeMore(value,this.products[0].totalPage);
  }
  getSearchFiter(searchFilter){
    this.searchParam.categoriesListId = searchFilter.categoriesListId;
    this.searchParam.filterOption.categories = searchFilter.filterOption.categories;
    this.searchParam.filterOption.location = searchFilter.filterOption.location;
    this.searchParam.filterOption.rating = searchFilter.filterOption.rating;
    this.searchParam.currentLatitude = searchFilter.currentLatitude;
    this.searchParam.currentLongitude = searchFilter.currentLongitude;
    this.routerSearch(1);
    console.log("i word", this.searchParam);
  }
}
