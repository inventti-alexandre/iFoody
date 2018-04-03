import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../../shared/services/product.service';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import * as apiUrl from '../../../../constant/apiUrl';
import { imageDefault } from './../../../../constant/global';
import { CategoryService } from '../../../../shared/services/category.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'product-item-manager',
  templateUrl: './product-item-manager.component.html',
  styleUrls: ['./product-item-manager.component.scss']
})
export class ProductItemManagerComponent implements OnInit {

  @Input() productId: string;
  productModel: any;
  productUrl: string;
  imageDefault:string;
  categories: any[];
  productItemForm: FormGroup;
  
  constructor(private _productService: ProductService,
            private _http: Http,
            private route: ActivatedRoute,
            private router: Router,
            private _categoryService: CategoryService
          ) {
   this.productUrl = apiUrl.GetAllProduct;
   this.imageDefault = imageDefault;
   this._categoryService.GetAll().subscribe(data=>{
    this.categories = data;
    console.log("category", data);
  });
  }

  ngOnInit() {
    this.productItemForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
      categoryId: new FormControl(),
    });

    this._productService.GetProductById(this.productId)
      .subscribe(data =>{
          console.log("HIHIHIHI, ",data);
          this.productModel = data;
        });
  }

  getProductDetail() {
    console.log("getProductDetail works");
    if(this.productId != null) {
      return this._productService.GetProductById(this.productId.replace(/['"]+/g, ''))
        .subscribe((data: Response) => {
          this.router.navigate(['/product', this.productId]);
        });
    }
    return null;
  }

  onSubmit() {
    console.log("onSubmit");
    this._productService.updateProduct(this.productId, this.productItemForm.value)
      .subscribe(data => {
        console.log("data", data);
        alert("Cập nhật thành công.");
      });

  }

}
