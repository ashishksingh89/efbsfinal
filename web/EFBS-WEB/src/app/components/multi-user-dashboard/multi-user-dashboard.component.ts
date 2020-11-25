import { Component, OnInit } from '@angular/core';
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

  constructor(public tokenService: TokenStorageService) { }

  ngOnInit() {

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

}
