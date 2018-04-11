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
import { StoreService } from '../../../../shared/services/store.service';
declare var deleteImageObject: any;
@Component({
  selector: 'product-item-manager',
  templateUrl: './product-item-manager.component.html',
  styleUrls: ['./product-item-manager.component.scss']
})
export class ProductItemManagerComponent implements OnInit {

  @Input('productModel') productModel: any;
  // productModel: any;
  productUrl: string;
  categories: any[];
  productItemForm: FormGroup;
  images: any;
  imageDefault: any;
  imageDomain:any;
  storeId: any;

  fileUploadComponentQuantity: any[];

  @ViewChildren(FileUploadComponent) fileUploadComponent: QueryList<any>;
  fileUploads: any[];
  constructor(private _productService: ProductService,
            private _storeService: StoreService,
            private _http: Http,
            private route: ActivatedRoute,
            private router: Router,
            private _categoryService: CategoryService
          ) {
    window.scrollTo(0,0);
    this.imageDefault = imageDefault;
    this.productUrl = apiUrl.GetAllProduct;
    this.imageDomain = apiUrl.ImageDomain;
    this.images = [];
    this.fileUploads = [];
    this.fileUploadComponentQuantity = [1,2,3,4,5];
    
    this.productItemForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
      categoryId: new FormControl(),
      images: new FormControl(),
      storeId: new FormControl()
    });

    this._categoryService.GetAll().subscribe(data=>{
      this.categories = data;
    });

    // this.route.params.subscribe(params => {
    //   console.log('change param id: ', params['id']);
    //   if(params['id']) {
    //     this.storeId = params['id'];
    //   }
    // });
  }

  ngOnInit() {
    this.productItemForm.setValue({
      id: this.productModel.product.id,
      name: this.productModel.product.name,
      price: this.productModel.product.price,
      description: this.productModel.product.description,
      categoryId: this.productModel.product.categoryId,
      images: this.productModel.images,
      storeId: this.productModel.store.id
    });
    this.images = this.productModel.images;
    this.images.forEach(image => {
      image.path = image.path.replace('~/','');
    });
    this.fileUploadComponentQuantity = this.fileUploadComponentQuantity.slice(0, 5 - this.images.length); 
    
    // this._storeService.(this.productId)
    //   .subscribe(data =>{
    //       console.log("HIHIHIHI, ",data);
    //       this.productModel = data;
    //       if(this.productModel.images.length > 0) {
    //         this.productModel.images.forEach(image => {
    //           image.path = image.path.replace('~/','');
    //           console.log('imagePath mới nè: ', image.path);
    //         });
    //       }
    //     });
  }

  // getProductDetail() {
  //   console.log("getProductDetail works");
  //   if(this.productId != null) {
  //     return this._productService.GetProductById(this.productId.replace(/['"]+/g, ''))
  //       .subscribe((data: Response) => {
  //         this.router.navigate(['/product', this.productId]);
  //       });
  //   }
  //   return null;
  // }
  deleteImage(id: any) {
    console.log("deleteImage Product running");
    console.log('id image', id);
    this._storeService.deleteImage(id)
      .subscribe(result => {
        console.log('result', result);
        alert("Xóa hình ảnh thành công!!!");
        deleteImageObject.deleteImage('image',id);
        console.log("Delete   DONE");
      });
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

    this.productItemForm.patchValue({'images': this.fileUploads});
    console.log("onSubmit");
    console.log('onsubmit', this.productItemForm.value);
    this._productService.updateProduct(this.productModel.product.id, this.productItemForm.value)
      .subscribe(data => {
        console.log("data", data);
        alert("Cập nhật thành công.");
      });

  }

  deleteProduct() {
    console.log("deleteProduct TS works");
    if(confirm("Bạn muốn xóa " + this.productModel.product.name + '?')) {
      this._productService.deleteProduct(this.productModel.product.id)
        .subscribe(result => {
          console.log('result tra ve ', result);
          alert("Xóa sản phẩm thành công!!!");
          document.getElementById(this.productModel.product.id).remove();
        });
      }
  }
}
