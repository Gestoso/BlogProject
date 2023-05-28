import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/auth.service';
import { UserDataService } from 'src/app/user-data.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  usuario: any;
  email: any;
  thereis = false;
  blog: any
  constructor(
    private userData: UserDataService,
    private router: Router,
    private http: HttpClient,
    private guard: AuthGuard,
    private auth: AuthService
  ){
    this.usuario = JSON.stringify(this.userData.getuserdata());
    this.blog = this.auth.getbloginfo();
  }
  ngOnInit(): void {
    console.log(this.guard.canActivate());
    console.log(this.auth.getToken());
    console.log(this.auth.getUser());
    console.log(this.auth.getBlog());

    this.auth.getToken();
    this.auth.getUser();
    this.auth.getBlog();



  }



}
