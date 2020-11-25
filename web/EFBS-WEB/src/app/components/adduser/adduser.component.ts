import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/models/AppResponse';
import { AdminService } from 'src/app/services/admin.service';
import { ApplicationConstants } from 'src/app/services/ApplicationConstants';
import { AppRegExConstants } from 'src/app/services/AppRegExConstants';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  
  emolyeeForm: FormGroup;
  resData: AppResponse;
  companyId:string;
  submitted = false;
  public show=false;

  private employeeUrl = "///";

  constructor(private tokenService: TokenStorageService,private adminService:AdminService,private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    let API_URL = "http://localhost:8085/company/api/getlistofcompanybysystemadmin";

    this.adminService.findAllCompany(API_URL).subscribe(res => {
      console.log("2");
      // console.log(JSON.stringify(res));
      this.resData = new AppResponse(res);
      console.log(JSON.stringify(this.resData.data));

      if (res.status === 401) {
        console.log("401");
        //401 token related issue
        this.tokenService.clearSession();
        this.router.navigate(['login']);
      } else if (res.status === 403) {
        //403 URL not accessible
        console.log("403");
        this.router.navigate(['dashboardbm']);
      }
    });
    this.emolyeeForm = this.formBuilder.group({
      'firstname': ['', [Validators.required, Validators.pattern(AppRegExConstants.ALPHABETS_WITH_SPACE)]],
      'middlename': [''],
      'lastname': ['',[Validators.pattern(AppRegExConstants.ALPHABETS)]],
      'contact': ['',[Validators.pattern(AppRegExConstants.TEN_DIGIT_CONTACT_NUMBER)]],
      'companyid': ['', Validators.required],
      'email': ['', [Validators.required,Validators.pattern(AppRegExConstants.EMAIL)]],

    });

  }
  get employee() {
     return this.emolyeeForm
  .controls;
  }
  onSubmit() {

    this.submitted = true;
    console.log("RESPONSE:" + JSON.stringify(this.emolyeeForm
  .value));

    if (this.emolyeeForm.invalid) {
      console.error("invalid request")
      return;
    } else {
      this.emolyeeForm.controls['companyd'].setValue(this.companyId);
      console.log("valid request");
      this.userService.getEmployeeList(this.emolyeeForm
    .value)
      .subscribe((res) => {
        console.log("INSIDE THE FIRST");
        if (res != undefined) {
          this.resData = new AppResponse(res);
          console.log("RESPONSE:" + JSON.stringify(this.resData));
          if (res.status == 200) {
            this.submitted = false;
            // this.eventForm.reset();
            // this.commonService.showNotificationSuccess(ApplicationConstants.MSG_BOX_LABEL, ApplicationConstants.SUCCESS_LABLE, `${this.resData.message}`);
            setTimeout(() => {
              this.router.navigate(['employeelist']);
            }, 3000);  //15s
          } else if (res.status == 401) {
            this.router.navigate(['logout']);
          } else {
            // this.commonService.showNotificationSuccess(ApplicationConstants.MSG_BOX_LABEL, ApplicationConstants.DANGER_LABLE, `${this.resData.errors}`);
          }
        } else {
          // this.commonService.showNotificationSuccess(ApplicationConstants.MSG_BOX_LABEL, ApplicationConstants.DANGER_LABLE, `${this.resData.errors}`);
        }
      });


    }

  }


  getCompany(companyId) {
    // this.show=true;
    this.companyId=companyId;
    console.log("company" + this.companyId);
    // this.states = this.Countries.find(cntry => cntry.name == country).states;
    // this.httpService.get(environment.BASE_URL + ApplicationURIConstants.GET_EXTERNAL_USER_BY_OCCUPATION + '/' + countryId).subscribe(res => {
    //   console.log("2");
    //   console.log(JSON.stringify(res));
    //   this.externaluser = res;
    //   console.log(JSON.stringify(this.externaluser));
    //   if (res.status === 401) {
    //     console.log("401");
    //     //401 token related issue
    //     this.tokenService.clearSession();
    //     this.router.navigate(['login']);
    //   } else if (res.status === 403) {
    //     //403 URL not accessible
    //     console.log("403");
    //     this.router.navigate(['dashboardbm']);
    //   }

    // });

  }

}
