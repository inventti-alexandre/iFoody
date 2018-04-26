import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'similar-product',
  templateUrl: './similar-product.component.html',
  styleUrls: ['./similar-product.component.scss']
})
export class SimilarProductComponent implements OnInit {
  @Input() productId: string;
  public similarProducts: any[];
  public data: any;
  public initPage;
  public totalPage;
  public initCount;
  public isLoading:Boolean;

  constructor(private _productService: ProductService) {
    this.initPage = 1;
    this.totalPage = 0;
    this.initCount = 20;
    this.similarProducts = [];
    this.data = [];
    this.isLoading = true;
  }

  ngOnInit() {
    this.getSimilarProducts(this.productId,this.initPage,this.initCount);
  }
  getSimilarProducts(productId,page,count){
    this.isLoading = true;
    // let result = this._productService.getSimilarProducts(productId,page,count);
    this._productService.getSimilarProducts(productId,page,count)
    .subscribe((data: Response) => {
        this.isLoading = false;
        this.data = data;
        if(data.status===404){

        }else{
          this.data.results.forEach(product=>{
            this.similarProducts.push(product);
          })
          console.log("wtf", this.similarProducts);
        }
    })
  }
  seeMore(nextPage){
    this.getSimilarProducts(this.productId,nextPage,this.initCount);
  }

}
