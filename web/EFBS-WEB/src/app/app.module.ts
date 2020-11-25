import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AdduserComponent } from './components/adduser/adduser.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { CompanylistComponent } from './components/companylist/companylist.component';
import { SystemadmindashboardComponent } from './components/systemadmindashboard/systemadmindashboard.component';
import { CompanydashboardComponent } from './components/companydashboard/companydashboard.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ApplicationConstants } from './services/ApplicationConstants';
import { UserService } from './services/user.service';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { httpInterceptorProviders } from './guards/auth-interceptor';
import { MultiUserDashboardComponent } from './components/multi-user-dashboard/multi-user-dashboard.component';

const providers = [
  AuthGuard,
  UserService,
  httpInterceptorProviders,
]

export function tokenGetter() {
  return  JSON.parse(localStorage.getItem(ApplicationConstants.CURRENT_USER))[0][ApplicationConstants.TOKEN_KEY]
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    AdduserComponent,
    UserlistComponent,
    CompanylistComponent,
    SystemadmindashboardComponent,
    CompanydashboardComponent,
    MultiUserDashboardComponent,
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: [environment.WHITE_LISTED_DOMAINS],
        // blacklistedRoutes: [environment.BLACK_LISTED_ROUTERS]
      }
    }),
    ],
  providers: [providers,UserService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers
    }

  }
}
