import { ICategory } from './allModel';
import { Store } from './../../constant/apiUrl';
import { Params } from "@angular/router";
import { DatePipe } from "@angular/common/src/pipes";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  categoryId: string;
  storeId: string;
  ratingCount: number;
}

export interface IUploadProduct {
    id: string;
    name: string;
    price: number;
    description: string;
    categoryId: string;
    storeId: string;
    rating: number;
    ratingCount: number;
    images: any[];
}

export interface IStore {
  id: string;
  name: string;
  rating: number;
  ratingCount: number;
  openHour: DatePipe;
  closeHour: DatePipe;
  lowestPrice: number;
  highestPrice: number;
  description: string;
  registrationDate: DatePipe;
  address: string;
  district: string;
  city: string;
  categoryId: string;
  userId: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IImages {
  id: string;
  name: string;
  path: string;
}

export interface IUser {
  email: string;
  lastName: string;
  firstName: string;
  gender: string;
  password: string;
  // birthday: string;
  birthday: Date;
  isAdmin: boolean;
  hasStore: boolean;
}

export interface IToken {
  userId: string;
  authToken: string;
  issuedOn: Date;
  ExpiresOn: Date;
}

export interface IBsBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

export interface IFavoriteList {
  id: string;
  userId: string;
  productId: string;
  storeId: string;
}

export interface IReview {
  id?: string;
  reviewContent: string;
  rating: number;
  date: Date;
  userId: string;
  productId: string;
  storeId: string;
  product?: IProduct;
  user?: IUser;
  review?: IReview;
}
export interface ISearchParam {
  searchString: string;
  page: number;
  currentLatitude: number;
  currentLongitude: number;
  categoriesListId: any[];
  districtList: any[];
  count: number;
  filterOption: {
    location: boolean;
    categories: boolean;
    districts: boolean;
    rating: boolean;
  };
}
export interface ISearchResult{
  Store: IStore,
  Category: ICategory,
  Images: IImages,
  Distance: number
}
