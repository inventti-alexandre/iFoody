import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AuthService } from './../shared/services/auth.service';
import { StoreService } from './../shared/services/store.service';
import { ProductService } from './../shared/services/product.service';
import { UserService } from './../shared/services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap/rating';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule, MatButtonModule } from '@angular/material';
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
import { StoreDetailComponent } from './components/store-detail/store-detail.component';
import { StoreDetailInfoComponent } from './components/store-detail/store-detail-info/store-detail-info.component';
import { StoreDetailMenuComponent } from './components/store-detail/store-detail-menu/store-detail-menu.component';
import { SimilarStoreComponent } from './components/store-detail/similar-store/similar-store.component';
import { NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProductItemManagerComponent } from './components/store-detail/product-item-manager/product-item-manager.component';
import { RouterModule } from '@angular/router';
import { FileUploadComponent } from '../uploading/file-upload/file-upload.component';
import { UploadingModule } from '../uploading/uploading.module';

@NgModule({
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    MatCheckboxModule,
    RouterModule,
    PopoverModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCiZd64MtnFqNtuhvpWcGjBBjfzi0feu0Q'
    }),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RatingModule,
    ButtonsModule.forRoot(),
    UploadingModule
  ],
  exports: [
    SearchFilterComponent,
    MapComponent,
    ReviewComponent,
    SimilarProductComponent,
    ProductDetailComponent,
    SearchResultComponent,
    MapComponent,
    StoreDetailComponent,
    ProductItemManagerComponent,
    StoreDetailMenuComponent,
  ],
  declarations: [
    SearchFilterComponent,
    MapComponent,
    ReviewComponent,
    SimilarProductComponent,
    ProductDetailComponent,
    SearchResultComponent,
    StoreDetailComponent,
    StoreDetailInfoComponent,
    StoreDetailMenuComponent,
    SimilarStoreComponent,
    ProductItemManagerComponent,
  ],
  entryComponents: [
    FileUploadComponent
  ],
  providers: [
    UserService,
    ProductService,
    StoreService,
    AuthService,
    DatePipe
  ],
})
export class SearchingModule { }
