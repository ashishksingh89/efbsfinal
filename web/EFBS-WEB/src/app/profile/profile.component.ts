import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../models/user';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: string;

  constructor(private userService: UserService, private router: Router,tokenService :TokenStorageService) {
    this.currentUser=tokenService.getuserName()  }

  ngOnInit() {
    if(!this.currentUser){
      this.router.navigate(['/login']);
    }
  }

  
}
