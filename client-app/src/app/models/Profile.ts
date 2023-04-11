import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
}
//in the construct class auto set propws on currently logged user 
//class can use as a type as well as profile
export class Profile implements Profile {
  constructor(user : User){
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}