import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'bs-pagination',
  templateUrl: './bs-pagination.component.html',
  styleUrls: ['./bs-pagination.component.scss']
})
export class BsPaginationComponent  {
  @Output() targetPage = new EventEmitter();
  @Input('maxSize') maxSize;
  @Input('bigTotalItems') bigTotalItems;
  public bigCurrentPage = 1;
  public numPages = 0;
  Dau: string;
  Cuoi: string;
  Sau: string;
  Truoc: string;
  previousPage:number;

  constructor() {
    this.maxSize = 5;
    // this.bigTotalItems = 35;  // Above Round
    this.Dau = "Đầu";
    this.Cuoi = "Cuối";
    this.Sau = "Sau";
    this.Truoc = "Trước";
    this.previousPage = this.bigCurrentPage;
  }
  changePage(page: any) {
    // console.log("page", page);
    if(page.target.innerText=="Đầu"){
      this.targetPage.emit(1);
      this.previousPage = 1;
    }
    else if(page.target.innerText=="Cuối"){
      this.targetPage.emit(this.bigTotalItems/10);
      this.previousPage = this.bigTotalItems/10;
    }
    else if(page.target.innerText=="Trước"){
      this.targetPage.emit(this.previousPage - 1);
      this.previousPage = this.previousPage -1;
    }
    else if(page.target.innerText=="Sau"){
      this.targetPage.emit(this.previousPage + 1);
      this.previousPage = this.previousPage + 1;
    }
    else{
      this.targetPage.emit(page.target.innerText);
      this.previousPage = parseInt(page.target.innerText);
    }
  }
}
