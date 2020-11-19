import { Component, OnInit } from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './models/user';
import {Role} from './models/role';
import {Router} from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { ApplicationConstants } from './services/ApplicationConstants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Employee-FeedBack-System';
  currentUser: string;
   user:Boolean;
  constructor(private userService: UserService, private router: Router,private tokenService:TokenStorageService){
     
  }
  ngOnInit() {
   
    this.user=true;
    this.currentUser=this.tokenService.getuserName()
   console.log(this.currentUser+"ffh")
  }

 

  public logout(){
    this.userService.logout();
    this.user=false;
    this.router.navigate(['/login']);
  }

  // get isAdmin(){
  //   return JSON.parse(localStorage.getItem(ApplicationConstants.CURRENT_USER))[0][ApplicationConstants.ROLES];;
  // }


}
