import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  constructor(private http: HttpClient) { }

  public insertProduct(product: any) : Observable<any>{
    const token = localStorage.getItem("id_token");
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
  //  .set('Access-Control-Allow-Origin', '*')
    .set('authorization', token || "");

    debugger;
    return this.http.post('http://localhost:5000/api/products/', { product }, { 'headers': headers });
  }
}
