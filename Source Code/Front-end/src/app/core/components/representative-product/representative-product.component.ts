import { Component, OnInit, group, AfterContentInit,
  AfterContentChecked, OnChanges, OnDestroy, DoCheck, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { ProductService } from './../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'representative-product',
  templateUrl: './representative-product.component.html',
  styleUrls: ['./representative-product.component.scss'],
  providers: [ProductService, CategoryService]
})
export class RepresentativeProductComponent implements OnInit{
  public products: any[];
  public categories: any[];
  public initPage;
  public initCount;

  constructor(private _productService: ProductService, private _categoryService: CategoryService) {
    this.products = [];
    this.initPage = 1;
    this.initCount = 8;
  }

  ngOnInit() {
    // get all cetegory
    this._categoryService.GetAll()
      .subscribe(data => this.categories = data,
      error => console.log(error),
      () => {
        // get products by category (1 page)
        this.categories.forEach(item=>{
          this._productService.PagingAllProductsByCategory(item.id,this.initPage,this.initCount).subscribe(data=>{
            if(data!==null){
              this.products.push(data);
            }else{
              console.log("empty");
            }
          },
            // error => console.log(error),
            () => {}
          );
        });
      }
      );
  }
  getNextPage(id,page){
    this._productService.PagingAllProductsByCategory(id,page,this.initCount).subscribe(data=>{
      if(data!==null){
        this.products.forEach(group=>{
          if(group.results[0].category.id===id){
            group.currentPage=data.currentPage;
            data.results.forEach(product=>{
              group.results.push(product);
            });
          }
        });
        console.log('more', this.products);
      }else{
        console.log("emptty");
      }
    },
      // error => console.log(error),
      () => {}
    );
  }
  seeMore(id, currentPage, totalPage){
    if(currentPage<totalPage){
      this.getNextPage(id,currentPage+1);
    }
  }

}
