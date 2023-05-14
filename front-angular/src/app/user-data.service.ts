import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
userdata: any;
  constructor() { }

  getuserdata() {
    return this.userdata;
  }
  setuserdata(value: any){
    this.userdata = value
  }


}
