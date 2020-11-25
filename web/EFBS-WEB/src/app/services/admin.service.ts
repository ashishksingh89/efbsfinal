import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import { AppResponse } from '../models/AppResponse';
import { TokenStorageService } from './token-storage.service';
import { NGXLogger } from 'ngx-logger';
import { ApplicationUtils } from './ApplicationUtils';
import {catchError, map, tap} from 'rxjs/operators';

let API_URL = "http://localhost:8080/api/admin/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // currentUser: User;
  // headers: HttpHeaders;

  // constructor(private http: HttpClient,private tokenService:TokenStorageService,private logger: NGXLogger,private applicationUtils : ApplicationUtils) {
  //   // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   // this.headers = new HttpHeaders({
  //   //   authorization:'Bearer ' + this.currentUser.token,
  //   //   "Content-Type":"application/json; charset=UTF-8"
  //   // });
  // }


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


  findAllUsers(): Observable<any> {
    return this.http.get(API_URL + "all", {headers: this.headers});
  }


  public findAllCompany(uri: string): Observable<AppResponse> {
    return this.http.get<AppResponse>(uri)
      .pipe(
        tap(_ => this.logger.info('Get request')),
        catchError(this.applicationUtils.handelError<AppResponse>(`Error in processing get request`))

      );
  }
}
