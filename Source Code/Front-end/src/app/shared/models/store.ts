import { DatePipe } from "@angular/common/src/pipes/date_pipe";

export interface IStore {
    id: string;
    name: string;
    rating: number;
    openHour: DatePipe;
    closeHour: DatePipe;
    lowestPrice: number;
    highestPrice: number;
    description: string;
    registrationDate: Date;
    address: string;
    district: string;
    city: string;
    categoryId: string;
    userId: string;
}
