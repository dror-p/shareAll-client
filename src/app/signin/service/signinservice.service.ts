import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SigninService {
  constructor(private http: HttpClient) { }

 public SaveSignin(response: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/auth/register', response);
  }
 }