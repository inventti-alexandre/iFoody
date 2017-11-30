import { DatePipe } from '@angular/common/src/pipes';

export class Product {
    id: string;
    name: string;
    price: number;
    description: string;
    categoryId: string;
    storeId: string;
}

export class Store{
    id: string;
    name:string;
    rating:number;
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
}

export class Category{
    id: string;
    name: string;
}

export class Images{
    id: string;
    name: string;
    path: string;
}