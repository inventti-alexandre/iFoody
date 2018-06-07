import { SearchService } from '../../../../shared/services/search.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'similar-store',
  templateUrl: './similar-store.component.html',
  styleUrls: ['./similar-store.component.scss'],
  providers: [SearchService]
})
export class SimilarStoreComponent implements OnInit {

  @Input() storeId: string;
  public similarStores: any[];
  public data: any;
  public initPage;
  public totalPage;
  public initCount;
  public isLoading:Boolean;

  constructor(private _searchService: SearchService) {
    this.initPage = 1;
    this.totalPage = 0;
    this.initCount = 20;
    this.similarStores = [];
    this.data = [];
    this.isLoading = true;
  }

  ngOnInit() {
    this.getSimilarStores(this.storeId,this.initPage,this.initCount);
  }
  getSimilarStores(storeId,page,count){
    this.isLoading = true;
    // let result = this._productService.getSimilarProducts(productId,page,count);
    this._searchService.GetSimilarStores(storeId,page,count)
    .subscribe((data: Response) => {
        this.isLoading = false;
        this.data = data;
        if(data.status===404){
          console.log("SIMILAR STORE", this.similarStores);
        }else{
          this.data.results.forEach(product=>{
            this.similarStores.push(product);
          })
          console.log("wtf", this.similarStores);
        }
    })
  }
  seeMore(nextPage){
    this.getSimilarStores(this.storeId,nextPage,this.initCount);
  }


}
