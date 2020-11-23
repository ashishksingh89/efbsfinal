import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { AppResponse } from 'src/app/models/AppResponse';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  dataTable: any;
  resData: AppResponse;

  constructor(private userService: UserService, private router: Router, private tokenService: TokenStorageService, private fb: FormBuilder) {
  }
  ngOnInit() {

  }

  ngAfterViewInit(): void {
    let API_URL = "http://localhost:8085/api/auth/signin";
    // tslint:disable-next-line: max-line-length
    this.userService.getCategories(API_URL).subscribe(res => {
    // this.httpService.get(environment.BASE_URL + ApplicationURIConstant.MR_LIST + '?includeGroup=false').subscribe(res => {
      this.resData = new AppResponse(res);
      console.log("resdata:"+this.resData);
      setTimeout(() => {
        $('#mrListDataTable').DataTable({
          responsive: true,
          autoWidth: true,
          searching: true,
          /*"ordering": true,*/
          order: [],
          language: {
            zeroRecords: 'No records found.',
          },
          lengthMenu: [[5, 10, 15, 20, -1], [5, 10, 15, 20, 'All']],
          pageLength: 5,
          pagingType: $(window).width() < 768 ? "full" : "full_numbers",
          processing: true,
          columnDefs: [{
            targets: 5,
            orderable: false
          },
        ]
        });
      }, 200);
      if (this.resData.status === 401) {
        //401 token related issue
        this.tokenService.clearSession();
        this.router.navigate(['login']);
      } else if (this.resData.status === 403) {
        //403 URL not accessible
        this.router.navigate(['home']);
      }
    });
  }

}
