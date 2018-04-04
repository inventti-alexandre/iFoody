import { ISearchParam } from './../../../shared/models/allModel';
import { SearchService } from './../../../shared/services/search.service';
import { Component, OnInit, Input } from '@angular/core';
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
  storeIds: any;

  public products: any[];
  public initPage;
  public totalPage;
  public initCount;
  public searchParam: ISearchParam;
  public filterOption:{};

  constructor(private _searchService: SearchService, private router: ActivatedRoute,) {
    this.products = [];
    this.initPage = 1;
    this.totalPage = 0;
    this.initCount = 18;
    this.filterOption={
      1:'location',
      2:'categories',
      3:'districts',
      4:'rating'
    }
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
  }
  getSearchPaging(targetPage) {
    if(this.searchParam.searchString != "") {
      this.searchParam.page = targetPage;
      return this._searchService.Search(this.searchParam)
        .subscribe((data: Response) => {
          if(this.products.length!==0){
            this.products.splice(0, 1, data);
          }else{
            this.products.push(data);
          }
          if(this.totalPage==0){
            this.totalPage =this.products[0].totalPage;
          }
          console.log("page",this.products[0].currentPage, this.products[0]);
        });
    }
    return null;
  }

  ngOnInit() {
    this.router.queryParams.subscribe((params: Params) => {
      this.searchParam.searchString = params['name'];
      console.log('searchString ', this.searchParam);
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

}
