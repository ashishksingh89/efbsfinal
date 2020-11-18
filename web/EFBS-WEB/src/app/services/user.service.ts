import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import { AppResponse } from '../models/AppResponse';

let API_URL = "http://localhost:8085/api/auth/signin";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User> (JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  
 
  signIn( credentials: any): Observable<AppResponse> {
    return this.http.post<AppResponse>(API_URL, credentials).pipe(
          map(response => {
            if(response) {
              localStorage.setItem('currentUser', JSON.stringify(response.data));
               this.currentUserSubject.next(response.data);
            }
            return response;
          })
        );
  }

  // login(user: User): Observable<any> {
  //   const headers = new HttpHeaders(user ? {
  //     authorization:'Basic ' + btoa(user.username + ':' + user.password)
  //   }:{});

  //   return this.http.get<any> (API_URL + "login", {headers:headers}).pipe(
  //     map(response => {
  //       if(response) {
  //         localStorage.setItem('currentUser', JSON.stringify(response));
  //         this.currentUserSubject.next(response);
  //       }
  //       return response;
  //     })
  //   );
  // }

  // logOut(): Observable<any> {
  //   return this.http.post("http://localhost:8085/api/"+ "logout", {}).pipe(
  //     map(response => {
  //       localStorage.removeItem('currentUser');
  //       localStorage.clear();
  //       this.currentUserSubject.next(null);
  //     })
  //   );
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

  register(user: User): Observable<any> {
    return this.http.post(API_URL + "registration", JSON.stringify(user),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

}
