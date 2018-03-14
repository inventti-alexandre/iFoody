import { Component, OnInit } from '@angular/core';
declare var searchObject: any;

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})

export class SearchFilterComponent implements OnInit {
  
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
  ngOnInit() {
    searchObject.hide();
    console.log("ngOnInit works well");
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
