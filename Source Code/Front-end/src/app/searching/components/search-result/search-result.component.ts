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
  public initCount;
  public searchString;
  constructor(private _searchService: SearchService, private router: ActivatedRoute,) {
    this.products = [];
    this.initPage = 1;
    this.initCount = 20;
    // this.searchString = "trà";
  }
  getSearchPaging(searchString,initPage) {
    if(this.searchString != null) {
      return this._searchService.SearchPaging(searchString,initPage,this.initCount)
        .subscribe((data: Response) => {
          if(this.products.length!==0){
            this.products.splice(0, 1, data);
          }else{
            this.products.push(data);
          }
          console.log("result blaaaaaaa",this.products,this.products[0].currentPage,this.products[0].totalPage);
        });
    }
    return null;
  }

  ngOnInit() {
    this.router.queryParams.subscribe((params: Params) => {
      this.searchString = params['name'];
      console.log('searchString ', this.searchString);
      this.getSearchPaging(this.searchString,this.initPage);
    });
  }
  seeMore(searchString, targetPage, totalPage){
    if(targetPage<=totalPage){
      this.getSearchPaging(searchString,targetPage);
    }
  }

  getTargetPage(value: any) {
    // this.targetPage = parseInt(value);
    this.seeMore(this.searchString,value,this.products[0].totalPage);
  }

}
