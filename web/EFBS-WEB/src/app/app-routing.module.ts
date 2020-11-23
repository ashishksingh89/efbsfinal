import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './components/adduser/adduser.component';
import { CompanydashboardComponent } from './components/companydashboard/companydashboard.component';
import { CompanylistComponent } from './components/companylist/companylist.component';
import {LoginComponent} from './components/login/login.component';
import { SystemadmindashboardComponent } from './components/systemadmindashboard/systemadmindashboard.component';
import { UserlistComponent } from './components/userlist/userlist.component';

import {Role} from './models/role';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent},
  {path:'companydashboard', component: CompanydashboardComponent},
  {path:'systemadmindashboard', component: SystemadmindashboardComponent},
  {path:'employeelist', component: UserlistComponent},
  {path:'addemployee', component: AdduserComponent},
  {path:'companylist', component: CompanylistComponent},
  {path:'profile', component: ProfileComponent},

  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
