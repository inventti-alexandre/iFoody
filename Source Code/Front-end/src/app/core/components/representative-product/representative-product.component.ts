import { Component, OnInit } from '@angular/core';
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
export class RepresentativeProductComponent implements OnInit {
  public products: any[];
  public categories: any[];
  public initPage;
  public initCount;

  constructor(private _productService: ProductService, private _categoryService: CategoryService) {
    this.products = [];
    this.initPage = 1;
    this.initCount = 6;
  }
  ngOnInit() {
    // get all cetegory:
    this._categoryService.GetAll()
      .subscribe(data => this.categories = data,
      error => console.log(error),
      () => {
        console.log("category", this.categories);
        //get products by category (1 page)
        this.categories.forEach(item=>{
          this._productService.PagingAllProductsByCategory(item.id,this.initPage,this.initCount).subscribe(data=>{
            if(data!==null){
              this.products.push(data);
              console.log(this.products);
            }else{
              console.log("emptty");
            }
          },
            //error => console.log(error),
            () => {}
          );
        });
        console.log("category", this.products);
      }
      );
  }

// >>>>>>> origin/Phuong_Dev
//   listProducts = [
//     {
//       name: "Coffee",

//     },
//     {
//       name: "Trà sữa",
//     },
//     {
//       name: "Sản phẩm đề xuất",
//     }
//   ];
  
  // public values: any[];
  // constructor(private _dataService: ProductService) {}
  // ngOnInit() {
  //   this._dataService
  //       .GetAll()
  //       .subscribe(data => this.values = data,
  //       );
  // }

  
}
