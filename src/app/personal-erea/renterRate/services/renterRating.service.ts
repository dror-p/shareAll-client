import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { user } from '../../../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class renterRatingService {
  constructor(private http: HttpClient) { }

  public async saveNewRate(selectedRating: any, userEmail: string) {
    const currUserEmail = userEmail;//localStorage.getItem('user_email');
    //get the user current rate
    const currUser: user = <user> (await this.http.get('http://localhost:5000/api/users/rateById/' + currUserEmail).toPromise());
    
    const currRate:number = currUser.renterRate;

    //calculate the user new rate
    const newTotalRate = (selectedRating + currRate) / 2;

    //send post to the server to save the new rate
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:5000/api/users/editRenterRate/' + currUserEmail + '/' + newTotalRate, {headers: headers}).subscribe();        
  }
 }