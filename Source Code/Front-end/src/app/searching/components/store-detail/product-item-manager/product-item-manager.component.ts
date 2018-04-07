import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { ProductService } from '../../../../shared/services/product.service';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import * as apiUrl from '../../../../constant/apiUrl';
import { imageDefault } from './../../../../constant/global';
import { CategoryService } from '../../../../shared/services/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploadComponent } from '../../../../uploading/file-upload/file-upload.component';

@Component({
  selector: 'product-item-manager',
  templateUrl: './product-item-manager.component.html',
  styleUrls: ['./product-item-manager.component.scss']
})
export class ProductItemManagerComponent implements OnInit {

  @Input() productId: string;
  productModel: any;
  productUrl: string;
  categories: any[];
  productItemForm: FormGroup;
  images: any;
  imageDefault: any;
  imageDomain:any;
  @ViewChildren(FileUploadComponent) fileUploadComponent: QueryList<any>;
  fileUploads: any[];
  constructor(private _productService: ProductService,
            private _http: Http,
            private route: ActivatedRoute,
            private router: Router,
            private _categoryService: CategoryService
          ) {
  this.imageDefault = imageDefault;
  this.productUrl = apiUrl.GetAllProduct;
  this.imageDomain = apiUrl.ImageDomain;
  this.images = [];
  this.fileUploads = [];

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
      images: new FormControl()
    });

    this._productService.GetProductById(this.productId)
      .subscribe(data =>{
          console.log("HIHIHIHI, ",data);
          this.productModel = data;
          if(this.productModel.images.length > 0) {
            this.productModel.images.forEach(image => {
              image.path = image.path.replace('~/','');
              console.log('imagePath mới nè: ', image.path);
            });
          }
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
    this.fileUploadComponent.forEach(component => {
      if(component.loaded !== false) {
        console.log("AAAAAAAAAAA", component);
        this.fileUploads.push(
          {'localFilePath': '',
          'fileName': component.file.name,
          'fileType': component.file.type,
          'fileLength': component.file.size,
          'fileContent': component.imageSrc
        });
      }
    });

    console.log('this.fileUploads', this.fileUploads);
    this.productItemForm.patchValue({'images': this.fileUploads});
    console.log("onSubmit");
    this._productService.updateProduct(this.productId, this.productItemForm.value)
      .subscribe(data => {
        console.log("data", data);
        alert("Cập nhật thành công.");
      });

  }

}
