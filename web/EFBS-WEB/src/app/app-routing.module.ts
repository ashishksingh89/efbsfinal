import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {UnathorizedComponent} from './components/unathorized/unathorized.component';

import {AuthGuard} from './guards/auth.guard';
import {Role} from './models/role';

const routes: Routes = [
  //public pages
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  //user+admin
  {path:'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard],
   data: {roles: [Role.ROLE_EMPLOYEE]}
  },
  // {path:'detail/:id',
  // component:DetailComponent,
  // canActivate: [AuthGuard],
  // data: {roles: [Role.ADMIN]}
  // },
  // {path:'admin',
  // component: AdminComponent,
  // canActivate: [AuthGuard],
  // data: {roles: [Role.ADMIN]}
  // },
  //public error pages.
  {path:'404', component: NotFoundComponent},
  {path:'401', component: UnathorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
constructor(private router: Router) {
  //For unkhown pages
  this.router.errorHandler = (error: any) => {
    this.router.navigate(['/404']);
  }
}
}
