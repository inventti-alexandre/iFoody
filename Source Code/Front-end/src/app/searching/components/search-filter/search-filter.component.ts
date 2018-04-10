import { Component, OnInit, Output, EventEmitter, DoCheck} from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';

declare var currentLocationObject: any;
declare var currentLocationGlobal : any;

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit, DoCheck {
  public categories: any[];
  public searchFilter;
  @Output("filterChange") filterChange= new EventEmitter();
  items = [
    {
      id: 1,
      text: 'First item'
    },
    {
      id: 2,
      text: 'Second item'
    },
    {
      id: 3,
      text: 'Third item'
    }
  ];
  constructor(private _categoryService: CategoryService) {
    this.categories = [];
  }
  resetSearchFilter=()=>{
    this.searchFilter={
      "currentLatitude": 0,
      "currentLongitude": 0,
      "categoriesListId": [],
      "filterOption":{
        "location": false,
        "categories":false,
        "rating": false
      }
    }
  }
  ngOnInit() {
    this.resetSearchFilter();
    this.getAllCategories();
  }
  getAllCategories=()=>{
    this._categoryService.GetAll()
      .subscribe(data => {
        this.categories = data;
      },
      error => console.log(error),
    )
  }
  chooseCategories=(event)=>{
    if(event.checked){
      this.searchFilter.categoriesListId.push(event.source.value)
    }else{
      for(let i=0;i<this.searchFilter.categoriesListId.length;i++){
        if(this.searchFilter.categoriesListId[i]==event.source.value){
          this.searchFilter.categoriesListId.splice(i, 1);
          break;
        }
      }
    }
    if(this.searchFilter.categoriesListId.length>0){
      this.searchFilter.filterOption.categories = true;
    }else{
      this.searchFilter.filterOption.categories = false;
    }

    //TEST
    this.filterChange.emit(this.searchFilter);
  }
  ngDoCheck() {
    if(this.searchFilter.currentLatitude === 0 && currentLocationGlobal!== undefined){
      this.searchFilter.currentLatitude = currentLocationGlobal.lat;
      this.searchFilter.currentLongitude = currentLocationGlobal.lng;
      this.searchFilter.filterOption.location = true;
    }
  }
  setLocationFilter=()=>{
    currentLocationObject.get();
  }
}
