import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class loginservice {
  constructor(private http: HttpClient) { }

  getUserById(id: string) {
    const token = localStorage.getItem("id_token");
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      //  .set('Access-Control-Allow-Origin', '*')
      .set('authorization', token || "");

    return this.http.get('http://localhost:5000/api/users/' + id, { 'headers': headers });
  }

  getUserByEmail(email: string) {
    return this.http.get('http://localhost:5000/api/users/getByEmail/' + email);
  }
 public login(response: any): Observable<any> {
  return this.http.post('http://localhost:5000/api/auth/login', response);
}
   setSession(authResult: any) {
    const expiresAt = moment().add(60 * 60,'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user_email");
  }
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration || '{}');
    return moment(expiresAt);
  }
}

