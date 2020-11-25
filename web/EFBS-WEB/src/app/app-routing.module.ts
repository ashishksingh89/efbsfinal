import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './components/adduser/adduser.component';
import { CompanydashboardComponent } from './components/companydashboard/companydashboard.component';
import { CompanylistComponent } from './components/companylist/companylist.component';
import {LoginComponent} from './components/login/login.component';
import { MultiUserDashboardComponent } from './components/multi-user-dashboard/multi-user-dashboard.component';
import { SystemadmindashboardComponent } from './components/systemadmindashboard/systemadmindashboard.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { AuthGuard } from './guards/auth.guard';

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
  {path:'companylist', component: CompanylistComponent,canActivate: [AuthGuard]},
  {path:'dashboard', component: MultiUserDashboardComponent},
  {path:'profile', component: ProfileComponent},
  { path: '**', component: LoginComponent ,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
