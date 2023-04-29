import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {user} from '../../user/user.model';

@Injectable()
export class PersonalAreaService {
  constructor(private http: HttpClient) {
  }

  public getAllUserProducts(userMail: string): Observable<any> {
    return this.http.get('http://localhost:5000/api/products/productsbyuser/' + userMail);
  }

  public savePersonalInfo(user: any) {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json');

    return this.http.post('http://localhost:5000/api/users/userupdate/', {user}, { 'headers': headers });
  }

  public addPartner(userId: string, productId: string) {
    return this.http.post('http://localhost:5000/api/products/RequestApproval/' + userId + '/' + productId, {});
  }

  public getUser(userMail: string): Observable<any> {
    const token = localStorage.getItem("id_token");
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      //  .set('Access-Control-Allow-Origin', '*')
      .set('authorization', token || "");

    return this.http.get('http://localhost:5000/api/users/getByEmail/' + userMail, { 'headers': headers });
  }

  public getRequestsForRent(userId: string) {
    return this.http.post('http://localhost:5000/api/products/getRentReqs/' + userId, {});
  }
}
