import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-multi-user-dashboard',
  templateUrl: './multi-user-dashboard.component.html',
  styleUrls: ['./multi-user-dashboard.component.css']
})
export class MultiUserDashboardComponent implements OnInit {

  roles: any[] = [];
  isValidEmployee : boolean;
  isValidCompanyHR : boolean;
  isValidCompanyADmin : boolean;

  constructor(public tokenService: TokenStorageService,private router:Router) { }

  ngOnInit() {
    // this.router.navigate([this.router.url])

    setTimeout(() => {
      window.location.reload();
    }, 300000); // Activate after 5 minutes.
   console.log(this.tokenService.getRoles());
   this.roles = this.tokenService.getRoles();

   for(var i=0; i<this.roles.length; i++){
     if(this.roles[i] == Role.ROLE_COMPANY_ADMIN)
       this.isValidCompanyADmin = true;
     else if(this.roles[i] == Role.ROLE_COMPANY_HR)
       this.isValidCompanyHR = true;
   
     else
       this.isValidEmployee = true;
   }
  }


  public setCompanyAdminForLoggedinUser(){

    window.localStorage.setItem("isValidCompanyADmin", "true");
    console.log("isValidCompanyADmin"+localStorage.getItem("isValidCompanyADmin"))
  }

  public setCompanyHRForLoggedinUser(){
    window.localStorage.setItem("isValidCompanyHR", "true");
    console.log("isValidCompanyHR"+localStorage.getItem("isValidCompanyHR"))

  }

  public setEmployeeForLoggedinUser(){
    window.localStorage.setItem("isValidEmployee", "true");
    console.log("isValidEmployee"+localStorage.getItem("isValidEmployee"))

  }
}
