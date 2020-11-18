import { Component } from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './models/user';
import {Role} from './models/role';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee-FeedBack-System';
  currentUser: User;

  constructor(private userService: UserService, private router: Router){
    localStorage.clear();
     this.userService.currentUser.subscribe(data => {
       this.currentUser = data;
     })
    //  console.log(JSON.parse(this);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
}

  get isAdmin(){
    return this.currentUser && this.currentUser.role === Role.ROLE_SYSTEM_ADMIN;
  }
}
