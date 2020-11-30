import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Role } from 'src/app/models/role';

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
    roles: any[] = [];
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: UserService,
        private tokenService :TokenStorageService
    ) { 
       
    }

    ngOnInit() {
      location.reload();

      window.stop();
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
                this.tokenService.saveUserTokenData(appResponse.data);
                 this.roles=this.tokenService.getRoles();
                 console.log("len:" + this.roles.length)
                 console.log("test:" + this.roles[0]); 
                 if (this.roles.length > 1) {
                    if (appResponse.data) {
                        console.log("len1:" + this.roles.length)

                      this.router.navigate(['/dashboard']);
                    //   window.location.reload();
                    } else {
                        console.log("len2:" + this.roles.length)

                      this.router.navigate(['/login']);
                    //   window.location.reload();

                    }
                  } else {
                   
                    console.log("len3:" + this.roles.length)

                      if (this.roles[0] == Role.ROLE_SYSTEM_ADMIN)
                        this.router.navigate(['systemadmindashboard']);
                      else if (this.roles[0] == Role.ROLE_COMPANY_ADMIN || Role.ROLE_COMPANY_HR)
                        this.router.navigate(['systemadmindashboard']);
                    
                      else if (this.roles[0] == Role.ROLE_EMPLOYEE)
                        this.router.navigate(['dashboardgu']);
                      else
                        this.router.navigate(['login']);
                    
                  }                    
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

