import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/auth.service';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  usuario: any
  email: any
  constructor(
    private userData: UserDataService,
    private router: Router,
    private http: HttpClient,
    private guard: AuthGuard,
    private auth: AuthService
  ){
    this.usuario = JSON.stringify(this.userData.getuserdata());
  }
  ngOnInit(): void {
    console.log(this.guard.canActivate());
    console.log(this.auth.getToken());
    console.log(this.auth.getEmail());
    this.auth.getToken();
    this.auth.getEmail();


  }



  logout(){
    console.log(this.usuario);

    return this.http
      .post('http://127.0.0.1:8000/api/logout', {email: this.auth.getEmail()})
      .subscribe((response) => {
        this.router.navigate(['/login']);
      });
  }

}
