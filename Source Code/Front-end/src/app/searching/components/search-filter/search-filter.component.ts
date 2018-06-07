import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, Output, EventEmitter, DoCheck} from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
declare var currentLocationGlobal;
declare var searchObject: any;

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit{
  public categories: any[];
  public searchFilter;
  public filterCategoriesDisplay: string;
  @Output("filterChange") filterChange= new EventEmitter();
  constructor(private _categoryService: CategoryService) {
    this.categories = [];
    this.filterCategoriesDisplay = "Chọn loại";
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
  setCategories=(data)=>{
    data.forEach(item=>{
      this.categories.push({
        id: item.id, name: item.name, checked: false
      })
    })
  }
  resetSearchFilter=()=>{
    this.searchFilter.currentLatitude = 0;
    this.searchFilter.currentLongitude = 0;
    this.searchFilter.filterOption.location = false;
    this.searchFilter.filterOption.rating = false;
  }
  ngOnInit() {
    this.getAllCategories();
  }
  getAllCategories=()=>{
    this._categoryService.GetAll()
      .subscribe(data => {
        // this.categories = data;
        this.setCategories(data);
      },
      error => console.log(error),
    )
  }
  chooseCategories=(event)=>{
    if(!event.checked){
      this.searchFilter.categoriesListId.push(event.id)
    }else{
      for(let i=0;i<this.searchFilter.categoriesListId.length;i++){
        if(this.searchFilter.categoriesListId[i]===event.id){
          this.searchFilter.categoriesListId.splice(i, 1);
          break;
        }
      }
    }
    if(this.searchFilter.categoriesListId.length>0){
      this.searchFilter.filterOption.categories = true;
      this.filterCategoriesDisplay = this.searchFilter.categoriesListId.length + ' loại';
    }else{
      this.searchFilter.filterOption.categories = false;
      this.filterCategoriesDisplay = "Chọn loại";
    }
  }
  emitCategories=()=>{
    searchObject.hide();
    this.filterChange.emit(this.searchFilter);
  }
  resetCategories=()=>{
    this.searchFilter.categoriesListId = [];
    this.searchFilter.filterOption.categories = false;
    this.filterCategoriesDisplay = "Chọn loại";
    this.categories.forEach(item=>{
      item.checked = false;
    });
    this.emitCategories();
  }
  chooseLocationFilter=()=>{
    this.resetSearchFilter();
    this.searchFilter.currentLatitude = currentLocationGlobal.lat;
    this.searchFilter.currentLongitude = currentLocationGlobal.lng;
    this.searchFilter.filterOption.location = true;
    this.filterChange.emit(this.searchFilter);
    // alert(1);
  }
  chooseRatingFilter=()=>{
    this.resetSearchFilter();
    this.searchFilter.filterOption.rating = true;
    this.filterChange.emit(this.searchFilter);
  }
}
