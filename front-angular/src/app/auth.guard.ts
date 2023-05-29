import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserDataService } from './user-data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn = false;
  jsonData:any;
   data2:any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
    ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this.auth.getTokenuser();

    if (token) {
      this.tokens(token);

      this.setIsLoggedIn(true)
      return true;
    } else {
      this.setIsLoggedIn(false)
      this.router.navigate(['/login']);
      return false;
    }
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
      //this.app.setnav();
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  tokens(token:any){


    let data = {
      token: token,
  };

 this.http.post('http://127.0.0.1:8000/api/loginportoken', data)
  .subscribe(response => {

    this.jsonData=response;
    this.auth.setData(this.jsonData);
    this.setIsLoggedIn(true);




    localStorage.setItem('data', JSON.stringify(data));
    localStorage.getItem("data");
    console.log(this.auth.getData());

      this.router.navigate(['/main']);


  });

}

}
