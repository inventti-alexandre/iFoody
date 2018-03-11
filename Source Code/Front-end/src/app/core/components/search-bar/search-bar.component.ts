import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
// import { ClickOutside } from '../../directive/click-outside.directive';
@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input('name') name;
  @Input('area') area;

  searchQuery: string;
  districts: any[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.name = '';
    this.districts = [
      'Bình Thạnh',
      'Tân Bình',
      'Phú Nhuận',
      'Tân Phú',
      'Gò Vấp',
      'Bình Tân',
      'Thủ Đức',
      'Bình Chánh',
      'Nhà Bè',
      'Hóc Môn',
      'Củ Chi',
      'Cần Giờ',
    ];
  }

  ngOnInit() {
  }

  public setSearchQueryParam() {
    this.router.navigate(['/search'], { queryParams: { name: this.name, area: this.area } });
  }
 }
