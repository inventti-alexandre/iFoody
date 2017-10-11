import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input('name') name;
  @Input('area') area;
  
 
  searchQuery: string;
  constructor(private activatedRoute: ActivatedRoute, private  router: Router) {
    this.name = '';
   }

  ngOnInit() {
  }

  public setSearchQueryParam () {
    this.router.navigate(['/search'], {queryParams: {name: this.name, area: this.area}});
  }

}
