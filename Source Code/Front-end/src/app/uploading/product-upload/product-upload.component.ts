import { IUploadProduct } from './../../shared/models/allModel';
import { ProductService } from './../../shared/services/product.service';
import { StoreService } from '../../shared/services/store.service';
import {
   Component, 
   OnInit, 
   ViewChild, 
   ComponentFactoryResolver, 
   ViewContainerRef,
   ViewChildren, 
   ElementRef, 
   QueryList, 
   OnChanges} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as apiUrl from '../../constant/apiUrl';
import * as model from '../../shared/models/allModel';
import { CategoryService } from '../../shared/services/category.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { Router, ActivatedRoute } from '@angular/router';

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
  storeName: string;
  // @ViewChild(FileUploadComponent) fileUpload;
  @ViewChildren(FileUploadComponent) fileUploadComponent: QueryList<any>;
  fileUploads: any[];
  // @ViewChild('newUpload',{ read: ViewContainerRef }) newUpload: ViewContainerRef;
  
  // store: string;

  constructor(
    private _storeService: StoreService, 
    private _categoryService:CategoryService,
    private _productService: ProductService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private elRef: ElementRef
  ) { 
    window.scrollTo(0,0);
    this.userId = localStorage.getItem(apiUrl.UserId);
    this.categories = [];
    this.fileUploads = [];
    this.storeId = '';
    this._storeService.GetStoreByUserId(this.userId).subscribe(data=> {
      console.log(data);
      this.storeId = data.id;
      this.storeName = data.name;
    });
  }
  
  // createProduct=(info)=>{
  //   // let product={
  //   //   id:null,
  //   //   name:info.name,
  //   //   price:info.price,
  //   //   description:info.decription,
  //   //   categoryId:info.type,
  //   //   storeId: this.store,
  //   //   rating: null,
  //   //   ratingCount: null,
  //   //   images: null
  //   // };
  //   console.log('info', info);
  //   // this.newProduct.id = null;
  //   this.newProduct = info;
  //   this.newProduct.storeId = this.storeId;
  //   this.newProduct.rating = null;
  //   this.newProduct.ratingCount = null;
  //   this.newProduct.images = this.fileUploads;
  //   // this.newProduct.images = null;
  //   console.log('newproduct', this.newProduct);
    
  //   // this.newProduct.name = info.name;
  //   // this.newProduct.price = info.price;
  //   // this.newProduct.description = info.description;
  //   // this.newProduct.categoryId = info.categoryId;
  //   // this.newProduct.storeId = info.storeId;
  //   // this.newProduct.rating = null;
  //   // this.newProduct.ratingCount = null;
  //   // this.newProduct.images = null;
  //   // console.log('newproduct', this.newProduct);
  //   // this.newProduct = product;
  // }

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
    console.log("this.storeId", this.storeId);
    this.uploadProductForm.patchValue({'storeId': this.storeId});
    
  }

  checkFormValid() { 
    console.log("checkFormValid works");
    if(this.uploadProductForm.get('name').value &&
    this.uploadProductForm.get('price').value &&
    this.uploadProductForm.get('categoryId').value &&
    this.uploadProductForm.get('storeId').value &&
    this.uploadProductForm.get('images').value)
    {
      this.elRef.nativeElement.querySelector(".btn-upload").disabled = false;
    }
    else { 
      this.elRef.nativeElement.querySelector(".btn-upload").disabled = true;
    }
  }

  // Tuan made - Handle Images Upload
  handleFile(imageContent) {
    // console.log("handleFile works");
    // console.log(this.fileUpload);
    // this.fileUploads.push(
    //   {'localFilePath': '',
    //   'fileName': this.fileUpload.file.name,
    //   'fileType': this.fileUpload.file.type,
    //   'fileLength': this.fileUpload.file.size,
    //   'fileContent': this.fileUpload.imageSrc
    // });
    // console.log("handleFile22 works");
    // this.uploadProductForm.patchValue({'images': this.fileUploads});
  }

  // Tuan made - Add more Upload Image
  addNewComponentEvent() {
    // console.log("addnew works");
    // let componentFactory = this.componentFactoryResolver.resolveComponentFactory(FileUploadComponent);
    // this.newUpload.createComponent(componentFactory);
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
      this.fileUploadComponent.forEach(component => {
        if(component.imageSrc !== "") {
          this.fileUploads.push(
            {'localFilePath': '',
            'fileName': component.file.name,
            'fileType': component.file.type,
            'fileLength': component.file.size,
            'fileContent': component.imageSrc
          });
        }
      });
    
      console.log("this.storeId", this.storeId);
      this.uploadProductForm.patchValue({'storeId': this.storeId});
   
      this.uploadProductForm.patchValue({'images': this.fileUploads});
      
      // this.createProduct(this.uploadProductForm.value);
      this._productService.addNewProduct(this.uploadProductForm.value).subscribe(
        (data) => {
          console.log("new product add success",data);
          alert("Thêm sản phẩm thành công. Mời nhập thêm sản phẩm khác!!!");
          
          this.uploadProductForm.reset();
          this.fileUploadComponent.forEach(component => {
            component.imageSrc = "";
          });
          window.scrollTo(0,0);
        },
        error => {
          console.log("error: ", error);
          alert("Thông tin sản phẩm không chính xác. Xin nhập lại!");
          this.uploadProductForm.reset();
        }
      );
    }
  }
}

