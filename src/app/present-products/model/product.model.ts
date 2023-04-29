import {eProductType} from 'src/app/shared/enums/eProductType';

export interface Product {
    _id: number;
    name: string;
    category: string;
    location: string;
    long: string;
    lat: string;
    price_from: number;
    price_to: number;
    area: string;
    city: string;
    tags: string[];
    description: string;
    photos: string[];
    max_number_of_buyers: number;
    manager: string;
    ownership_percent: number;
    currentPeople: number;
    productType: eProductType;
    dailyPayment: number;
    hourlyPayment: number;
    users: Array<any>;
    distance: 0;
    pendings: string[];
}
