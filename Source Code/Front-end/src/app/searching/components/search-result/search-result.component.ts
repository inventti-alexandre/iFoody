import { SearchService } from './../../../shared/services/search.service';
import { Component, OnInit, Input } from '@angular/core';

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
  constructor(private _searchService: SearchService) {
    this.products = [];
    this.initPage = 1;
    this.initCount = 20;
    this.searchString = "trà";
  }
  getSearchPaging(searchString,initPage) {
    if(this.searchString != null) {
      return this._searchService.SearchPaging(searchString.replace(/['"]+/g, ''),initPage,this.initCount)
        .subscribe((data: Response) => {
          if(data!==null){
            this.products.push(data);
            console.log("search result",this.products);
            // this.storeIds.push(this.products.store.id);
          }else{
            console.log("search result empty");
          }
        });
    }
    return null;
  }

  ngOnInit() {
    this.getSearchPaging(this.searchString,this.initPage);
  }
  seeMore(searchString, currentPage, totalPage){
    if(currentPage<totalPage){
      this.getSearchPaging(searchString,currentPage+1);
    }
  }

  getTargetPage(value: any) {
    this.targetPage = value;
  }

}
