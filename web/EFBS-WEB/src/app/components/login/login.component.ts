import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error : any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: UserService
    ) { 
       
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
       
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit(){
        this.submitted = true;
      
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.authenticationService.signIn(this.loginForm.value)
        .subscribe(
          appResponse => {
                console.log("before"+JSON.stringify(appResponse))
                if(appResponse.status ===200){
                this.router.navigate(['/profile']);
                }
                else{
                this.error =appResponse.errors
                }
            },
            error => {
                this.error = error;
                 console.log("ss"+this.error)
            });
      }
}

