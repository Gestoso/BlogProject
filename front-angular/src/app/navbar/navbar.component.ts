import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  usuario: any
  constructor(
    public auth: AuthService,
    public router: Router,
    public http: HttpClient

  ){

  }
  perfil(){
    this.router.navigate(['/main/profile']);
  }

    logout(){
      console.log(this.usuario);

      return this.http
        .post('http://127.0.0.1:8000/api/logout', {email: this.auth.getUser()})
        .subscribe((response) => {
          this.router.navigate(['/login']);
        });
    }
}
