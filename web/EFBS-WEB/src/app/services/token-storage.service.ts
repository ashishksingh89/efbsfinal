import { Injectable } from '@angular/core';
import { ApplicationConstants } from './ApplicationConstants';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  private roles: Array<string> = [];
  private listRoles: Array<Int32Array> = [];
  constructor() { }

  public saveUserTokenData(userTokenData: any) {

    let jsonObject = {};
    for(var i = 0; i < userTokenData.urlTokens; i++) {
      // Trim the excess whitespace.
      userTokenData.urlTokens[i] = userTokenData.urlTokens[i].replace(/^\s*/, "").replace(/\s*$/, "");
      jsonObject[userTokenData.urlTokens[i]] = userTokenData.urlTokens[i];
   }
   //window.localStorage.setItem(ApplicationConstants.URL_TOKENS_LIST_KEY, JSON.stringify(jsonObject));
   var saPortal = {
     session: []
   };
   
   saPortal.session.push({
     [ApplicationConstants.TOKEN_KEY] :  userTokenData.accessToken,
     [ApplicationConstants.USER_PROFILE_INFO_ID_KEY] :  userTokenData.userprofileinfoid,
     [ApplicationConstants.AUTHORITIES_KEY] :  userTokenData.authorities,
     [ApplicationConstants.EMAIL_KEY] :  userTokenData.email,
     [ApplicationConstants.FULL_NAME_KEY] :  userTokenData.username,
     [ApplicationConstants.ROLES] : userTokenData.roles,
    });
    
    window.localStorage.setItem(ApplicationConstants.CURRENT_USER, JSON.stringify(saPortal.session));
  }
  
  public getToken(): string {
    if(localStorage.getItem(ApplicationConstants.CURRENT_USER)){
      return JSON.parse(localStorage.getItem(ApplicationConstants.CURRENT_USER))[0][ApplicationConstants.TOKEN_KEY];
    }
    return null;
  }

  public getuserProfileId(): string {
    return JSON.parse(localStorage.getItem(ApplicationConstants.CURRENT_USER))[0][ApplicationConstants.USER_PROFILE_INFO_ID_KEY]
  }

  public getEmail(): string {
    return JSON.parse(localStorage.getItem(ApplicationConstants.CURRENT_USER))[0][ApplicationConstants.EMAIL_KEY]
  }

  public getuserName(): string {
    
    return JSON.parse(localStorage.getItem(ApplicationConstants.CURRENT_USER))[0][ApplicationConstants.FULL_NAME_KEY]
  }

  public getRoles(): any[] {
    console.log("IMP:"+JSON.parse(localStorage.getItem(ApplicationConstants.CURRENT_USER))[0][ApplicationConstants.ROLES]);
    this.listRoles = JSON.parse(localStorage.getItem(ApplicationConstants.CURRENT_USER))[0][ApplicationConstants.ROLES];
    //return JSON.parse(localStorage.getItem(ApplicationConstants.USER_PORTAL))[0][ApplicationConstants.ROLES]
    return this.listRoles;
  }



  public getAuthorities(): string[] {
    this.roles = [];
    if (JSON.parse(localStorage.getItem(ApplicationConstants.CURRENT_USER))[0][ApplicationConstants.FULL_NAME_KEY]) {
      return JSON.parse(localStorage.getItem(ApplicationConstants.AUTHORITIES_KEY))[0][ApplicationConstants.FULL_NAME_KEY].forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public clearSession(){
    window.localStorage.clear();
  }
}
