import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';

import {AuthGuard} from './guards/auth.guard';
import {Role} from './models/role';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  //public pages
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent},
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
// constructor(private router: Router) {
//   //For unkhown pages
//   this.router.errorHandler = (error: any) => {
//     this.router.navigate(['/404']);
//   }
// }
}
