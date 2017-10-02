import { Component, OnInit } from '@angular/core';

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
  public isAreaCollapsed = true;
  public isTypeCollapsed = true;
  
   public areaCollapsed(event:any):void {
     console.log(event);
   }
  
   public areaExpanded(event:any):void {
     console.log(event);
   }

   public typeCollapsed(event:any):void {
    console.log(event);
  }
 
  public typeExpanded(event:any):void {
    console.log(event);
  }
  constructor() { }

  ngOnInit() {
  }

}
