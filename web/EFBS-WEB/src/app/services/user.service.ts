import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../models/user';
import { AppResponse } from '../models/AppResponse';
import { TokenStorageService } from './token-storage.service';
import { NGXLogger } from 'ngx-logger';
import { ApplicationUtils } from './ApplicationUtils';
import { Company } from '../models/company';

let API_URL = "http://localhost:8085/api/auth/signin";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  headers:any;
  constructor(private http: HttpClient,private tokenService:TokenStorageService,private logger: NGXLogger,private applicationUtils : ApplicationUtils) {
    this.currentUserSubject = new BehaviorSubject<User> (JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

 

   // To hit a simple get call for any other requests..
  //  public getEmployeeList(uri: string): Observable<any> {
  //   this.headers = new HttpHeaders().set("Authorization", "Bearer " +  this.tokenService.getToken());
  //   // this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getToken() });
  //   return this.http.get<any>(uri,{headers:this.headers});
  //     // .pipe(
  //     //   tap(_ => this.logger.info('Get request')),
  //     //   catchError(this.applicationUtils.handelError<any>(`Error in processing get request`))

  //     // );
  // }
  getCategories(apiURL : string): Observable<Company> {

  
    const httpOptions = {
         headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin' : '*',
         'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE'
         })
     };
 
    return this.http.get<Company>(apiURL+'api', httpOptions );
       //catchError(this.handleError)
     
   }

  // public getEmployeeList(uri: string): Observable<any> {
  //   return this.http.get<any>(uri)
  //     .pipe(
  //       tap(_ => this.logger.info('Get request')),
  //       catchError(this.applicationUtils.handelError<any>(`Error in processing get request`))

  //     );
  // }

  signIn(credentials: any): Observable<AppResponse> {
    return this.http.post<AppResponse>(API_URL, credentials, );
  }
    //.pipe(
    //       map(response => {
    //         if(response) {
    //           // localStorage.setItem('currentUser', JSON.stringify(response.data));
    //           //  this.currentUserSubject.next(response.data);
    //         }
    //         return response;
    //       })
    //     );
  

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    localStorage.clear();
}

  register(user: User): Observable<any> {
    return this.http.post(API_URL + "registration", JSON.stringify(user),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

}
