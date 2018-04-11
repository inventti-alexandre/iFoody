import { imageDefault } from './../../../../constant/global';
import * as apiUrl from './../../../../constant/apiUrl';
import { CategoryService } from './../../../../shared/services/category.service';
import { ProfileChildren } from '../../../models/profileChildren';
import { FormGroup, FormControl } from '@angular/forms';
import { IStore } from '../../../../shared/models/allModel';
import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../../shared/services/store.service';
import { ImageDomain, UserId } from './../../../../constant/apiUrl';
import { FileUploadComponent } from '../../../../uploading/file-upload/file-upload.component';
import { UserService } from '../../../../shared/services/user.service';
declare var deleteImageObject: any;

@Component({
  selector: 'store-profile',
  templateUrl: './store-profile.component.html',
  styleUrls: ['./store-profile.component.scss']
})
export class StoreProfileComponent implements OnInit, ProfileChildren, AfterViewInit {

  @Input('store') store;
  @Input() data: any;
  storeForm: any;
  categories: any;
  images: any;
  imageDefault: any;
  imageDomain:any;
  userId: any;
  @ViewChildren(FileUploadComponent) fileUploadComponent: QueryList<any>;
  fileUploads: any[];
  fileUploadComponentQuantity: any[];
  
  constructor(
    private cdr: ChangeDetectorRef, 
    private _storeService: StoreService, 
    private activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private router: Router) { 
    
      this.fileUploadComponentQuantity = [1,2,3,4,5];
      this.images = [];
      this.imageDefault = imageDefault;
      this.imageDomain = ImageDomain;
      this.fileUploads = [];
      this.userId = localStorage.getItem(apiUrl.UserId).replace(/['"]+/g, '');

      this.storeForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl(),
        rating: new FormControl(),
        ratingCount: new FormControl(),
        openHour: new FormControl(),
        closeHour: new FormControl(),
        lowestPrice: new FormControl(),
        highestPrice: new FormControl(),
        description: new FormControl(),
        registrationDate: new FormControl(),
        address: new FormControl(),
        district: new FormControl(),
        city: new FormControl(),
        categoryId: new FormControl(),
        userId: new FormControl(),
        images: new FormControl()
      });

      this._storeService.GetStoreByUserId(localStorage.getItem(apiUrl.UserId).replace(/['"]+/g, ''))
      .subscribe(data => {
        console.log(data);
        this.store = data;
        let registrationDate = new Date(this.store.registrationDate);
        this.store.registrationDate = registrationDate.getDate() + '-' + registrationDate.getMonth() + '-' + registrationDate.getFullYear();
       
        this.storeForm.setValue({
          id: this.store.id,
          name: this.store.name,
          rating: this.store.rating,
          ratingCount: this.store.ratingCount,
          openHour: this.store.openHour,
          closeHour: this.store.closeHour,
          lowestPrice: this.store.lowestPrice,
          highestPrice: this.store.highestPrice,
          description: this.store.description,
          registrationDate: this.store.registrationDate,
          address: this.store.address,
          district: this.store.district,
          city: this.store.city,
          categoryId: this.store.categoryId,
          userId: this.userId,
          images: []
        });

        this._storeService.getImageByStoreId(this.store.id)
          .subscribe(response => {
            console.log('response images', response);
              // if(response.length === 0) {
              //   console.log("33");
              //   response = {path: imageDefault, name: 'unknown'};
              //   console.log(response);
              // }
              this.images = response;
              this.images.forEach(image => {
                image.path = image.path.replace('~/','');
              });
              this.fileUploadComponentQuantity = this.fileUploadComponentQuantity.slice(0, 5 - this.images.length); 

              console.log('quantity fileUploadCOmponent', this.fileUploadComponentQuantity);
        });
      });
    }

  ngOnInit() {
    window.scrollTo(0,0);
    this._categoryService.GetAll()
      .subscribe(response => {
        this.categories = response;
      });
    this.cdr.detectChanges();
  }
  
  ngAfterViewInit() {
  }
  
  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    } else {
        return null;
    }
  }

  onSubmit() {
    console.log('this.fileUploadComponent', this.fileUploadComponent);
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
    this.storeForm.patchValue({'images': this.fileUploads});
    console.log('onsubmit', this.storeForm.value);
    this.fileUploads = [];
    this._storeService.updateStore(this.store.id, this.storeForm.value)
      .subscribe(response => {
        console.log("Cập nhật thành công");
        console.log("response in TS", response);
        alert("updateStore successfully!!!");
      });

    window.scrollTo(0,0);
      
    
  }

  deleteImage(id: any) {
    console.log("deleteImage run");
    console.log('id image', id);
    this._userService.deleteImage(id)
      .subscribe(result => {
        console.log('result', result);
        alert("Xóa thành công!!!");
        deleteImageObject.deleteImage('image',id);
        console.log("Delete   DONE");
      });
  }

  deleteStore() {
    console.log('deleteStore TS works');
    if(confirm("Bạn muốn xóa " + this.store.name + '?')) {
      this._storeService.deleteStore(this.store.id)
        .subscribe(result => {
          console.log('result tra ve', result);
          alert("Xóa Cửa hàng thành công!!!");
        });
      }
  }

  backToGeneral() {
    console.log("backtoGeneral works");
    this.router.navigate(["profile", localStorage.getItem("user_id").replace(/['"]+/g, ''), 'overview']);
  }

}
