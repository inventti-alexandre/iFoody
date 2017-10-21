import { Component } from '@angular/core';

@Component({
  selector: 'bs-pagination',
  templateUrl: './bs-pagination.component.html',
  styleUrls: ['./bs-pagination.component.scss']
})
export class BsPaginationComponent  {
  public maxSize = 5;
  public bigTotalItems = 175;
  public bigCurrentPage = 1;
  public numPages = 0;
}
