import { FileUploadComponent } from './../../../../uploading/file-upload/file-upload.component';
import { AuthService } from './../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { StoreService } from './../../../../shared/services/store.service';
import { CategoryService } from '../../../../shared/services/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { 
  Component, 
  ComponentFactoryResolver, 
  OnInit, 
  ViewContainerRef, 
  ViewChild, 
  ElementRef, 
  ViewChildren, 
  QueryList 
} from '@angular/core';
import { ProductService } from '../../../../shared/services/product.service';
import * as apiUrl from '../../../../constant/apiUrl';

@Component({
  selector: 'open-store',
  templateUrl: './open-store.component.html',
  styleUrls: ['./open-store.component.scss']
})
export class OpenStoreComponent implements OnInit {

  storeForm: FormGroup;
  openHours: any[];
  closeHours: any[];
  registrationDate: Date;
  cities: any[];
  categories: any;
  districts: any[];
  districtsTpHCM: any[];
  districtsHaNoi: any[];
  userId: string;
  userIdKey: string;
  imageUpload: any;
  imageContentList: any[];
  @ViewChild(FileUploadComponent) fileUpload;
  @ViewChildren(FileUploadComponent) fileUploadComponent: QueryList<any>;
  fileUploads: any[];
  // @ViewChild('newUpload',{ read: ViewContainerRef }) newUpload: ViewContainerRef;
  // @ViewChild('newFileUpload',{ read: ViewContainerRef }) newFileUpload: ViewContainerRef;
  isEnoughFill = false;

  constructor(private _categoryService: CategoryService,
              private _storeService: StoreService, 
              private router: Router,
              private _authService: AuthService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private elRef: ElementRef
            ) {
    window.scrollTo(0,0);
    this.userIdKey = apiUrl.UserId;
    this.userId = localStorage.getItem(this.userIdKey).replace(/['"]+/g,'');
    console.log(this.userId);
    this.imageContentList = [];
    this.fileUploads = [];
    this.openHours = [
      {id: 600, value: '06:00'},
      {id: 630, value: '06:30'},
      {id: 700, value: '07:00'},
      {id: 730, value: '07:30'},
      {id: 800, value: '08:00'},
      {id: 830, value: '08:30'},
      {id: 900, value: '09:00'},
      {id: 930, value: '09:30'},
      {id: 1000, value: '10:00'},
      {id: 1030, value: '10:30'},
      {id: 1100, value: '11:00'},
      {id: 1130, value: '11:30'},
      {id: 1200, value: '12:00'},
      {id: 1230, value: '12:30'},
      {id: 1300, value: '13:00'},
      {id: 1330, value: '13:30'},
      {id: 1400, value: '14:00'},
      {id: 1430, value: '14:30'},
      {id: 1500, value: '15:00'},
      {id: 1530, value: '15:30'},
      {id: 1600, value: '16:00'},
      {id: 1630, value: '16:30'},
      {id: 1700, value: '17:00'},
      {id: 1730, value: '17:30'},
      {id: 1800, value: '18:00'},
      {id: 1830, value: '18:30'},
      {id: 1900, value: '19:00'},
      {id: 1930, value: '19:30'},
      {id: 2000, value: '20:00'},
      {id: 2030, value: '20:30'},
      {id: 2100, value: '21:00'},
      {id: 2130, value: '21:30'},
      {id: 2200, value: '22:00'},
      {id: 2230, value: '22:30'},
      {id: 2300, value: '23:00'},
      {id: 2330, value: '23:30'},
      {id: 0, value: '00:00'},
      {id: 30, value: '00:30'},
      {id: 100, value: '01:00'},
      {id: 1300, value: '01:30'},
      {id: 200, value: '02:00'},
      {id: 230, value: '02:30'},
      {id: 300, value: '03:00'},
      {id: 350, value: '03:30'},
      {id: 400, value: '04:00'},
      {id: 430, value: '04:30'},
      {id: 500, value: '05:00'},
      {id: 530, value: '05:30'}
    ];

    this.closeHours = [
      {id: 600, value: '06:00'},
      {id: 630, value: '06:30'},
      {id: 700, value: '07:00'},
      {id: 730, value: '07:30'},
      {id: 800, value: '08:00'},
      {id: 830, value: '08:30'},
      {id: 900, value: '09:00'},
      {id: 930, value: '09:30'},
      {id: 1000, value: '10:00'},
      {id: 1030, value: '10:30'},
      {id: 1100, value: '11:00'},
      {id: 1130, value: '11:30'},
      {id: 1200, value: '12:00'},
      {id: 1230, value: '12:30'},
      {id: 1300, value: '13:00'},
      {id: 1330, value: '13:30'},
      {id: 1400, value: '14:00'},
      {id: 1430, value: '14:30'},
      {id: 1500, value: '15:00'},
      {id: 1530, value: '15:30'},
      {id: 1600, value: '16:00'},
      {id: 1630, value: '16:30'},
      {id: 1700, value: '17:00'},
      {id: 1730, value: '17:30'},
      {id: 1800, value: '18:00'},
      {id: 1830, value: '18:30'},
      {id: 1900, value: '19:00'},
      {id: 1930, value: '19:30'},
      {id: 2000, value: '20:00'},
      {id: 2030, value: '20:30'},
      {id: 2100, value: '21:00'},
      {id: 2130, value: '21:30'},
      {id: 2200, value: '22:00'},
      {id: 2230, value: '22:30'},
      {id: 2300, value: '23:00'},
      {id: 2330, value: '23:30'},
      {id: 0, value: '00:00'},
      {id: 30, value: '00:30'},
      {id: 100, value: '01:00'},
      {id: 1300, value: '01:30'},
      {id: 200, value: '02:00'},
      {id: 230, value: '02:30'},
      {id: 300, value: '03:00'},
      {id: 350, value: '03:30'},
      {id: 400, value: '04:00'},
      {id: 430, value: '04:30'},
      {id: 500, value: '05:00'},
      {id: 530, value: '05:30'}
    ];

    this.registrationDate = new Date(Date.now());

    this.cities = [ 
      {id: 1, value: 'TpHCM'},
      {id: 2, value: 'Hà Nội'},
    ];

    this.districts = [
    ];

    this.districtsTpHCM = [
      {id: 1, value:"quận 1"},
      {id: 2, value:"quận 2"},
      {id: 3, value:"quận 3"},
      {id: 4, value:"quận 4"},
      {id: 5, value:"quận 5"},
      {id: 6, value:"quận 6"},
      {id: 7, value:"quận 7"},
      {id: 8, value:"quận 8"},
      {id: 9, value:"quận 9"},
      {id: 10, value:"quận 10"},
      {id: 11, value:"quận 11"},
      {id: 12, value:"quận 12"},
      {id: 13, value:"quận Bình Thạnh"},
      {id: 14, value:"quận Bình Tân"},
      {id: 15, value:"quận Gò Vấp"},
      {id: 16, value:"quận Phú Nhuận"},
      {id: 17, value:"quận Tân Phú"},
      {id: 18, value:"quận Tân Bình"},
      {id: 19, value:"quận Thủ Đức"},
      {id: 20, value:"quận Bình Chánh"},
      {id: 20, value:"quận Cần Giờ"},
      {id: 21, value:"quận Củ Chi"},
      {id: 22, value:"quận Hóc Môn"},
      {id: 23, value:"quận Nhà Bè"},
      // {id: 44, value:"Quận 1"},
      // {id: 45, value:"Quận 1"},
      // {id: 46, value:"Quận 1"},
      // {id: 47, value:"Quận 1"},
      // {id: 48, value:"Quận 1"},
      // {id: 49, value:"Quận 1"},
      // {id: 50, value:"Quận 1"},
      // {id: 51, value:"Quận 1"},
      // {id: 52, value:"Quận 1"},
      // {id: 53, value:"Quận 1"},
      // {id: 54, value:"Quận 1"},
      // {id: 55, value:"Quận 1"},
    ];

    this.districtsHaNoi = [
      {id: 24, value:"Quận Ba Đình"},
      {id: 25, value:"Quận Hoàn Kiếm"},
      {id: 26, value:"Quận Hai Bà Trưng"},
      {id: 27, value:"Quận Đống Đa"},
      {id: 28, value:"Quận Tây Hồ"},
      {id: 29, value:"Quận Cầu Giấy"},
      {id: 30, value:"Quận Thanh Xuân"},
      {id: 31, value:"Quận Hoàng Mai"},
      {id: 32, value:"Quận Long Biên"},
      {id: 33, value:"Huyện Từ Liêm"},
      {id: 34, value:"Huyện Thanh Trì"},
      {id: 35, value:"Huyện Gia Lâm"},
      {id: 36, value:"Huyện Đông Anh"},
      {id: 37, value:"Huyện Sóc Sơn"},
    ];

    
    this._categoryService.GetAll()    
    .subscribe(response => {
      console.log("getCategory works");
      console.log(response);
      this.categories = response;
    });

  }

  ngOnInit() {
    this.storeForm = new FormGroup({
      name: new FormControl(),
      categoryId: new FormControl(),
      openHour: new FormControl(),
      closeHour: new FormControl(),
      lowestPrice: new FormControl(),
      highestPrice: new FormControl(),
      description: new FormControl(),
      city: new FormControl(),
      district: new FormControl(),
      address: new FormControl(),
      // confirmPassword: new FormControl(),
      images: new FormControl(),
      readPolicy: new FormControl(),
      userId: new FormControl()
    });
    this.storeForm.patchValue({'readPolicy': false});
    this.storeForm.patchValue({'userId': this.userId});
  }

  convertTime(time: number) {
    let timeString = time.toString();
    let length = timeString.length;
    let minute = timeString.substring(length-2);
    let hour = timeString.substring(0, length-2);
    let timeResult = new Date();
    timeResult.setHours(Number(hour));
    timeResult.setMinutes(Number(minute));
    timeResult.setSeconds(0);
    return timeResult;
  }
  
  applyTheme(pop: any) {
    setTimeout(() => {
      pop.show();
    });
  }

  onChangeCity(value) {
    if(value === "TpHCM") {
      this.districts = this.districtsTpHCM;
    }
    if(value === "Hà Nội") {
      this.districts = this.districtsHaNoi;
    }
    console.log(value);
  }

  checkFormValid() { 
    // console.log("test");
    if(this.storeForm.get('readPolicy').value === false) {
      this.storeForm.patchValue({'readPolicy': true});
    }
    else {
      this.storeForm.patchValue({'readPolicy': false});
    }    
    if(this.storeForm.get('name').value &&
    this.storeForm.get('categoryId').value &&
    this.storeForm.get('openHour').value &&
    this.storeForm.get('closeHour').value &&
    this.storeForm.get('lowestPrice').value &&
    this.storeForm.get('highestPrice').value &&
    this.storeForm.get('description').value &&
    this.storeForm.get('city').value &&
    this.storeForm.get('district').value &&
    this.storeForm.get('readPolicy').value)
    {
      this.elRef.nativeElement.querySelector(".btn-signup").disabled = false;
    }
    else { 
      this.elRef.nativeElement.querySelector(".btn-signup").disabled = true;
    }
  }

  onSubmit(value: any) {
    this.storeForm.patchValue({'userId': this.userId});
    if(!this.storeForm.valid) {
      return this.storeForm.reset();
    }
    if(!this.storeForm.get('readPolicy').value) {
      return this.storeForm.reset();
    }
    let openHour1 = this.convertTime(this.storeForm.get('openHour').value).getHours().toString();
    let openHour2 = this.convertTime(this.storeForm.get('openHour').value).getMinutes().toString();
    let openHour3 = this.convertTime(this.storeForm.get('openHour').value).getSeconds().toString();
    let closeHour1 = this.convertTime(this.storeForm.get('closeHour').value).getHours().toString();
    let closeHour2 = this.convertTime(this.storeForm.get('closeHour').value).getMinutes().toString();
    let closeHour3 = this.convertTime(this.storeForm.get('closeHour').value).getSeconds().toString();
    this.storeForm.patchValue(
      {'openHour': openHour1 + ':' + openHour2 + ':' + openHour3 ,
      'closeHour': closeHour1 + ':' + closeHour2 + ':' + closeHour3 },
    );
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
    this.storeForm.patchValue({'images': this.fileUploads});
    console.log("storeFrom before service", this.storeForm.value);
    this._storeService.openStore(this.storeForm.value)
      .subscribe(
        response => {
            console.log('response', response);
            alert("Mở cửa hàng thành công");
            this.router.navigate(['/profile', this.userId, 'store-profile']);
            // location.reload();
          },
        error => {
            console.log('Response error ?!');
            alert("Thông tin nhập vào không chính xác. Xin nhập lại!");
            this.storeForm.reset();
          }
        );
  }

  handleFile(imageContent) {
  }

  addNewComponentEvent() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(FileUploadComponent);
    // this.newUpload.createComponent(componentFactory);
  }

  reload() {
    console.log("reload work");
    location.reload();
  }
}
