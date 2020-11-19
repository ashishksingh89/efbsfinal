
export class ApplicationConstants {


     // Token & Session
     static readonly CURRENT_USER = 'currentuser';
     static readonly TOKEN_KEY = 'accessToken';
     static readonly TOKEN_TYPE = "Bearer ";
     static readonly AUTHORIZATION = "Authorization";
     static readonly TOKEN_HEADER_KEY = 'Authorization';
     static readonly AUTHORITIES_KEY = 'AuthAuthorities';

     static readonly USER_PROFILE_INFO_ID_KEY = 'userprofileinfoid';
     static readonly EMAIL_KEY = "email";
     static readonly FULL_NAME_KEY = "username";
     static readonly ROLES = "roles";


     // Success Or Error Label
     static readonly SUCCESS_LABLE = "success";
     static readonly ERROR_LABLE = "error";
     static readonly DANGER_LABLE = "danger";
     static readonly MSG_BOX_LABEL = "#messageBox";

     // Error msg
     static readonly INTERNAL_SEREVR_ERROR = "Internal server error.";
     static readonly MAXIMUM_FILE_SIZE ="Maximum file size 10MB";

     // Content type
     static readonly APPLICATION_JSON = "application/json";

    // Custome Message
    static readonly GROUP_CONFIGS_KEY = "group-configs";

    static readonly SERVER_CONNECTION_PROBLEM ="Server connection refused";

}
