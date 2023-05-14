import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
userdata: any;
isinside = false;

  constructor() { }

  getuserdata() {
    return this.userdata;
  }
  setuserdata(value: any){
    this.userdata = value
  }

  settoken(token: any){
    localStorage.setItem('token',token)
  }

  gettoken(){
    return localStorage.getItem('token')
    }

    islogged(){
      let email = "";
      try {
        if (this.userdata.email) {
         this.isinside= true;
        } else {
          this.isinside= false;
        }
      } catch (error) {
        this.isinside= false;
      }

    }

}
