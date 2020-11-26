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
  isSystemAdminLoggedin:Boolean;
  isValidEmployee : boolean;
  isValidCompanyHR : boolean;
  isValidCompanyADmin : boolean;
  roles:any[] = [];


  constructor(private http:HttpClient,private userService: UserService, private router: Router,private tokenService:TokenStorageService){
     
  }
  ngOnInit() {
    setTimeout(() => {
      window.location.reload();
    }, 300000); // Activate after 5 minutes.
    if(this.tokenService.getRoles()){
      this.roles=this.tokenService.getRoles();
      if (this.roles.length > 1) {
          if(localStorage.getItem("isValidCompanyADmin"))
          this.isValidCompanyADmin = true;
          else if (localStorage.getItem("isValidCompanyHR"))
          this.isValidCompanyHR = true;
         else
         this.isValidEmployee = true;  
         
        

      }
      else{
        console.log("len3:" + this.roles.length )
              
          if (this.roles[0] == Role.ROLE_SYSTEM_ADMIN)
          this.isSystemAdminLoggedin = true;
           else if (this.roles[0] == Role.ROLE_COMPANY_ADMIN)
           this.isValidCompanyADmin = true;
          else if (this.roles[0] == Role.ROLE_COMPANY_HR)
          this.isValidCompanyHR = true;
          else
          this.isValidEmployee = true;  
          
          console.log("isSystemAdminLoggedin"+ this.isSystemAdminLoggedin);
          console.log("isValidCompanyADmin"+ this.isValidCompanyADmin);
          console.log("isValidCompanyHR"+ this.isValidCompanyHR);
          console.log("isValidEmployee"+ this.isValidEmployee);
      }
      }       



  

  this.user=true;
  this.currentUser=this.tokenService.getuserName()
   console.log(this.currentUser+"ffh")
   console.log("00000"+this.tokenService.getToken())
  //  this.role=this.tokenService.getRoles();
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
