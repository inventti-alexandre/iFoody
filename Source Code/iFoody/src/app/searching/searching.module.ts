import { MdCheckboxModule } from '@angular/material';
import { CollapseModule } from 'ngx-bootstrap';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    MdCheckboxModule
  ],
  exports: [
    SearchFilterComponent
  ],
  declarations: [
    SearchFilterComponent
  ]
})
export class SearchingModule { }
