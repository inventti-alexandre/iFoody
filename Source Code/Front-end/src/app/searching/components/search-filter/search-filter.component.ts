import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
declare var searchObject: any;

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
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
    this.searchFilter={
      "categoriesListId": [],
      "filterOption":{
        "location": false,
        "categories":false,
        "rating": false
      }
    }
  }
  ngOnInit() {
    this.getAllCategories();
    searchObject.hide();
  }
  getAllCategories=()=>{
    this._categoryService.GetAll()
      .subscribe(data => {
        this.categories = data;
        console.log("categories:", this.categories);
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
    console.log("click",this.searchFilter.categoriesListId);

    //TEST
    this.filterChange.emit(this.searchFilter);
  }

  typeCollapsed(){

  }
  typeExpanded() {

  }

  loadScript(url) {
    // console.log('preparing to load...');
    // let node = document.createElement('script');
    // node.src = url;
    // node.type = 'text/javascript';
    // document.getElementsByTagName('head')[0].appendChild(node);
 }
}
