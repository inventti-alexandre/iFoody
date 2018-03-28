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
  
  constructor() {
    this.maxSize = 5;
    this.bigTotalItems = 35;  // Above Round
    this.Dau = "Đầu";
    this.Cuoi = "Cuối";
    this.Sau = "Sau";
    this.Truoc = "Trước";
  }

  changePage(page: any) {
    this.targetPage.emit(page.target.innerText);
  }
}
