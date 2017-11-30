import { ProductService } from './../../services/product.service';
import { UserService } from './../../services/user.service';
import { IProduct } from '../../models/product';
import { CurrencyPipe } from '@angular/common/src/pipes/number_pipe';
import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  // @Output() product: IProduct;
  @Input() productId: string;
  product: IProduct;
  // name: string;
  // price: number;
  constructor(private _productService: ProductService) { 
   
    // this.product.id = "abcde";
    // this.product.name = "Cơm Tấm Hà Tiên";
    // this.product.price = 25000;
  }

  ngOnInit() {
    console.log(this.productId);
    this._productService.GetProductById(this.productId)
      .subscribe(data =>{
          //console.log(data);
          this.product = data;
        });
    
  }

}
