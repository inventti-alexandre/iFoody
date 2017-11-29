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
  public productsGroupByCategory: any[];
  constructor(private _productService: ProductService, private _categoryService: CategoryService) {
    this.productsGroupByCategory = [];
  }
  ngOnInit() {
    //get all cetegory:
    this._categoryService.GetAll()
      .subscribe(data => this.categories = data,
      error => console.log(error),
      () => {
        console.log("category", this.categories);
      }
      );
    //get all products
    this._productService
      .GetAll()
      .subscribe(data => this.products = data,
      error => console.log(error),
      () => {
        //group products by category
        this.categories.forEach(category => {
          var productsByCategory = {
            categoryName: "",
            products: []
          };
          this._productService.GetProductByCategory(category.name, this.products, productsByCategory);
          if(productsByCategory.categoryName!==""){
            this.productsGroupByCategory.push(productsByCategory);
          }
        });
        console.log("Products group by category", this.productsGroupByCategory);
      }
      );
  }

  listProducts = [
    {
      name: "Coffee",

    },
    {
      name: "Trà sữa",
    },
    {
      name: "Sản phẩm đề xuất",
    }
  ]
}
