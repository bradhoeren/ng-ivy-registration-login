import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue() {
     return this.currentUserSubject.value;
   }

   login(username, password, instance) {
    const apiURL = 'https://webservices.collegenet.com/r25ws/wrd/' + instance + '/run/login.json';
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + (btoa(username + ':' + password))
    })

    return this.http.get<any>(apiURL, {headers})
    //  return this.http.post<any>(apiURL, { username, password })
     .pipe(map(user => {
       //store user details and jwt in local storage
       localStorage.setItem('currentUser', JSON.stringify(user));
       this.currentUserSubject.next(user);
       console.log(JSON.stringify(user))
       return user;
     }));
    }

     logout() {
       //remove user from local storage and set current user to null
       localStorage.removeItem('currentUser');
       this.currentUserSubject.next(null);
     }
}