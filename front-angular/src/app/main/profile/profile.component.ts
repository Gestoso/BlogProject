import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserDataService } from 'src/app/user-data.service';
import { ProfiledialogComponent } from '../profiledialog/profiledialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  usuario: any;
  infousu: any;
  userdata: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog

  ){
    setTimeout(() => {
      this.infousu = this.authService.getData();
      console.log(this.infousu.user);
    }, 1000);


/*     setInterval(() => {
      this.usuario = this.authService.getData();
      console.log(this.usuario);

    }, 1000) */

  }

  openDialog(){

    this.dialog.open(ProfiledialogComponent, {
      width: '650px',
      height: '400px',
      panelClass: 'dialog-centered',



    } )
  }
  return(){
    this.router.navigate(['/main'])
  }
  inicio() {
    let data = this.infousu.user.email
    console.log(this.infousu.user.email);

    return this.http.post('http://127.0.0.1:8000/api/datauser', data)
      .subscribe((response) => {
        this.usuario = response;

        this.authService.setDatauser(this.usuario)

        console.log(this.usuario);

      },

        error => {

        });

  }
}
