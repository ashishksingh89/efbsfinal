import { Component, OnInit } from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './models/user';
import {Role} from './models/role';
import {Router} from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { ApplicationConstants } from './services/ApplicationConstants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Employee-FeedBack-System';
  currentUser: string;
   user:Boolean;
  constructor(private http:HttpClient,private userService: UserService, private router: Router,private tokenService:TokenStorageService){
     
  }
  ngOnInit() {
    // this.userService.getEmployeeList('http://localhost:8085/company/api/getlistofcompanybysystemadmin')
    //   .subscribe(
    //     data => console.log("00000"+this.tokenService.getToken()),
    //     err => console.log("err"+err)
    //   );
    this.user=true;
    this.currentUser=this.tokenService.getuserName()
   console.log(this.currentUser+"ffh")
   console.log("00000"+this.tokenService.getToken())
  }

 

  // public connectServer() {
  //   this.http.get('url')
  //     .subscribe(
  //       data => console.log(data),
  //       err => console.log(err)
  //     );
  // }
  public logout(){
    this.userService.logout();
    this.user=false;
    this.router.navigate(['/login']);
  }

  // get isAdmin(){
  //   return JSON.parse(localStorage.getItem(ApplicationConstants.CURRENT_USER))[0][ApplicationConstants.ROLES];;
  // }


}
