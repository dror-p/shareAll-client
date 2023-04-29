import { Product } from '../model/product.model';
import {Injectable, Pipe, PipeTransform} from '@angular/core';

import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { eProductType } from 'src/app/shared/enums/eProductType';
import { user } from '../../user/user.model';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  products: Product[] = [];

  public getAllProducts(type: string): Observable<any> {
    return this.http.get('http://localhost:5000/api/products?type=' + type);
  }

  public getAvragePrice(productName: string): Observable<any> {
    return this.http.get('http://localhost:5000/api/products/avragePrice?product=' + productName);
  }

  getProductById(productID: number): Product {
    //   //return (PRODUCTS_TO_PURCHUE .filter(product => product.id === productID));
    return (this.products.filter(product => product._id === productID))[0];
    //   //return this.allProducts().map( prod => prod.id===productID);
  }

  requestRent(product: any, from: any, to: any, userId: any) {
    return this.http.post(`http://localhost:5000/api/products/${product._id}/rentRequest`, {userId, from, to});
  }

  addProductToHistory(userId: any, productId: number) {
    return this.http.get(`http://localhost:5000/api/users/${userId}/history/${productId}`);
  }

  getUserProductHistory(userId: any) {
    return this.http.get(`http://localhost:5000/api/users/${userId}/history`);
  }

  joinGroup(productId: any, userId: any) {
    return this.http.get(`http://localhost:5000/api/products/${productId}/groupRequest/${userId}`);
  }
  async getUserRateByEmail(userEmail: string): Promise<number> {
    const currUser: user = <user> (await this.http.get('http://localhost:5000/api/users/rateById/' + userEmail).toPromise());
    
    const currRate:number = currUser.renterRate;
    return currRate;
  }
}
