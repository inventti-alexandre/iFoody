import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap/rating';
import { SharedModule } from '../shared/shared.module';
import { MdCheckboxModule, MatButtonModule } from '@angular/material';
import { CollapseModule } from 'ngx-bootstrap';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { ReviewComponent } from './components/review/review.component';
import { BsRatingComponent } from '../shared/components/bs-rating/bs-rating.component';
import { SimilarProductComponent } from './components/similar-product/similar-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

@NgModule({
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    MdCheckboxModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCiZd64MtnFqNtuhvpWcGjBBjfzi0feu0Q'
    }),
    SharedModule,
    RatingModule.forRoot(),
    FormsModule,
    MatButtonModule,
  ],
  exports: [
    SearchFilterComponent,
    MapComponent,
    ReviewComponent,
    SimilarProductComponent,
    ProductDetailComponent,
    SearchResultComponent
  ],
  declarations: [
    SearchFilterComponent,
    MapComponent,
    ReviewComponent,
    SimilarProductComponent,
    ProductDetailComponent,
    SearchResultComponent
  ]
})
export class SearchingModule { }
