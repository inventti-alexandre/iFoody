import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as apiUrl from '../../constant/apiUrl';

@Component({
  selector: 'product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.scss'],
})
export class ProductUploadComponent implements OnInit {
  userId: string;
  uploadProduct: FormGroup;
  listPrice= [
    {value:'1',viewValue:'10 000'},
    {value:'2',viewValue:'20 000'},
    {value:'3',viewValue:'30 000'},
  ];
  listTypes=[
    'Trà sữa',
    'Cà phê',
    'Cơm tấm'
  ];
  constructor() { 
    this.userId = localStorage.getItem(apiUrl.UserId);
    console.log('userId', this.userId);
  }
  onSubmit() {
  }
  select(){
    console.log('type', this.uploadProduct.value);
  }
  ngOnInit() {
    this.uploadProduct = new FormGroup({
      name: new FormControl(),
      type: new FormControl(),
      price: new FormControl(),
      decription: new FormControl(),
    });
  }
}
