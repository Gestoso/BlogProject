import { Injectable, OnInit } from '@angular/core';
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
    console.log(this.jsonData);

    this.auth.setDatauser(this.jsonData.user);
    this.auth.setemailDatauser(this.jsonData.user.email)
    console.log(this.jsonData.user.email);

    if (this.jsonData.blog != null) {
          this.auth.setDataBlog(this.jsonData.blog);

    }
    this.auth.setCategorias(this.jsonData.categorias);
    this.setIsLoggedIn(true);




    localStorage.setItem('data', JSON.stringify(data));
    localStorage.getItem("data");
    console.log(this.auth.getDataBlog());
    console.log(this.auth.getDatauser());
    console.log(this.auth.getCategorias());

      this.router.navigate(['/main']);


  });

}

}
