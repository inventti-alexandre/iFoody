import { forEach } from '@angular/router/src/utils/collection';
import { ISearchParam } from './../../../shared/models/allModel';
import { SearchService } from './../../../shared/services/search.service';
import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  providers: [SearchService]
})
export class SearchResultComponent implements OnInit {
  results: any;
  addressList: string[]; // To get string Address List, like  ['268 Le Lai', '192 Ly Thai To']
  targetPage: number; // Value get from Bs-Pagination
  storeIds: any[];

  public products: any[];
  public initPage;
  public totalPage;
  public initCount;
  public searchParam: ISearchParam;

  constructor(private _searchService: SearchService, private router: ActivatedRoute,) {
    this.products = [];
    this.initPage = 1;
    this.totalPage = 0;
    this.initCount = 20;
  }

  ngOnInit() {
    this.getParam();
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
    if(this.searchParam.searchString != "") {
      this.searchParam.page = targetPage;
      this.setDistrictFilterOption();
      return this._searchService.Search(this.searchParam)
        .subscribe((data: Response) => {
          if(this.products.length!==0){
            this.products.splice(0, 1, data);
          }else{
            this.products.push(data);
          }
          this.totalPage =this.products[0].totalPage;
          this.setStoreIds(this.products[0].results);
          console.log("page",this.products[0].currentPage, this.products[0], this.storeIds);
        });
    }
    return null;
  }
  getParam=()=>{
    this.router.queryParams.subscribe((params: Params) => {
      this.initDefautlValue();
      this.searchParam.searchString = params['name']?params['name']:"";
      if(params['districts']){
        let districts = params['districts'].split(",");
        this.searchParam.districtList = districts;
      }
      this.getSearchPaging(this.initPage);
    });
  }

  seeMore(targetPage, totalPage){
    if(targetPage<=totalPage){
      this.getSearchPaging(targetPage);
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
    this.getSearchPaging(this.initPage);
    console.log("i word", this.searchParam);
  }
}
