import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private datauser: UserDataService,
    private auth: AuthService
    ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this.auth.getToken();

    if (token) {
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


}
