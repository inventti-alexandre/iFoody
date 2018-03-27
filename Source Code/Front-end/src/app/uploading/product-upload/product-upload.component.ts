import { IUploadProduct } from './../../shared/models/allModel';
import { ProductService } from './../../shared/services/product.service';
import { StoreService } from '../../shared/services/store.service';
import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as apiUrl from '../../constant/apiUrl';
import * as model from '../../shared/models/allModel';
import { CategoryService } from '../../shared/services/category.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { Router } from '@angular/router';

@Component({
  selector: 'product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.scss'],
})
export class ProductUploadComponent implements OnInit {
  userId: string;
  uploadProductForm: FormGroup;
  newProduct: model.IUploadProduct;
  categories: any[];
  storeId: string;
  @ViewChild(FileUploadComponent) fileUpload;
  fileUploads: any[];
  @ViewChild('newUpload',{ read: ViewContainerRef }) newUpload: ViewContainerRef;
  
  // store: string;

  constructor(
    private _storeService: StoreService, 
    private _categoryService:CategoryService,
    private _productService: ProductService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router
  ) { 
    this.userId = localStorage.getItem(apiUrl.UserId);
    this.categories = [];
    this.fileUploads = [];
    this._storeService.GetStoreByUserId(this.userId).subscribe(data=> {
      console.log(data);
      this.storeId = data.id;
    });
  }
  
  createProduct=(info)=>{
    // let product={
    //   id:null,
    //   name:info.name,
    //   price:info.price,
    //   description:info.decription,
    //   categoryId:info.type,
    //   storeId: this.store,
    //   rating: null,
    //   ratingCount: null,
    //   images: null
    // };
    console.log('info', info);
    // this.newProduct.id = null;
    this.newProduct = info;
    this.newProduct.storeId = this.storeId;
    this.newProduct.rating = null;
    this.newProduct.ratingCount = null;
    this.newProduct.images = this.fileUploads;
    // this.newProduct.images = null;
    console.log('newproduct', this.newProduct);
    
    // this.newProduct.name = info.name;
    // this.newProduct.price = info.price;
    // this.newProduct.description = info.description;
    // this.newProduct.categoryId = info.categoryId;
    // this.newProduct.storeId = info.storeId;
    // this.newProduct.rating = null;
    // this.newProduct.ratingCount = null;
    // this.newProduct.images = null;
    // console.log('newproduct', this.newProduct);
    // this.newProduct = product;
  }

  // onSubmit(event) {
  //   if(event.detail===1){ // check double click 
  //     this.createIProduct(this.uploadProduct.value);
  //     this._productService.addNewProduct(this.newProduct).subscribe(
  //       (data) => console.log("new product add success",data)
  //     );
  //   }
  // }

  select(){
     // console.log('type', this.uploadProduct.value);
  }
  
  ngOnInit() {
    console.log("ngOnInit works");
    this.uploadProductForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
      categoryId: new FormControl(),
      storeId: new FormControl(),
      rating: new FormControl(),
      ratingCount: new FormControl(),
      images: new FormControl(),
    });
    // get all category
    this._categoryService.GetAll().subscribe(data=>{
      this.categories = data;
    });
  }

  // Tuan made - Handle Images Upload
  handleFile(imageContent) {
    console.log("handleFile works");
    console.log(this.fileUpload);
    this.fileUploads.push(
      {'localFilePath': '',
      'fileName': this.fileUpload.file.name,
      'fileType': this.fileUpload.file.type,
      'fileLength': this.fileUpload.file.size,
      'fileContent': this.fileUpload.imageSrc
    });
    console.log("handleFile22 works");
    this.uploadProductForm.patchValue({'images': this.fileUploads});
  }

  // Tuan made - Add more Upload Image
  addNewComponentEvent() {
    console.log("addnew works");
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(FileUploadComponent);
    this.newUpload.createComponent(componentFactory);
  }

  onSubmit(value: any) {
    if(value.detail===1){ // check double click 
         console.log("form", this.uploadProductForm);
      // console.log("onSubmit works");
      // console.log('imagecontentlist: ', this.imageContentList);
      // this.uploadProductForm.patchValue({'userId': this.userId});
      if(!this.uploadProductForm.valid) {
        return this.uploadProductForm.reset();
      }
     
      // let openHour1 = this.convertTime(this.uploadProductForm.get('openHour').value).getHours().toString();
      // let openHour2 = this.convertTime(this.uploadProductForm.get('openHour').value).getMinutes().toString();
      // let openHour3 = this.convertTime(this.uploadProductForm.get('openHour').value).getSeconds().toString();
      // let closeHour1 = this.convertTime(this.uploadProductForm.get('closeHour').value).getHours().toString();
      // let closeHour2 = this.convertTime(this.uploadProductForm.get('closeHour').value).getMinutes().toString();
      // let closeHour3 = this.convertTime(this.uploadProductForm.get('closeHour').value).getSeconds().toString();
      // this.uploadProductForm.patchValue(
      //   {'openHour': openHour1 + ':' + openHour2 + ':' + openHour3 ,
      //   'closeHour': closeHour1 + ':' + closeHour2 + ':' + closeHour3 },
      // );

      // this._storeService.openStore(this.uploadProductForm.value)
      //   .subscribe(response => {
      //         alert("Đăng ký thành công!!!");
      //         this.router.navigate(['/']);
      //         console.log(response);
      //         // location.reload();
      //       });
      //     }
      this.createProduct(this.uploadProductForm.value);
      this._productService.addNewProduct(this.newProduct).subscribe(
        (data) => {
          console.log("new product add success",data);
          alert("Thêm sản phẩm thành công");
          this.router.navigate(['/']);
        });
    }
  }
}

