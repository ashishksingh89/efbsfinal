import {Role} from './role';
export class User {
  userprofileinfoid: number;
  username: string="";
  email: string="";
  password: string="";
  firstname: string="";
  lastname: string="";
  middlename: string="";
  role: Role;
  token: string="";
}
