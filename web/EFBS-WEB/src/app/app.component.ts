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
export class AppComponent {
  title = 'Employee-FeedBack-System';
 
}
