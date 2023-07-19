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
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog

  ){
    setTimeout(() => {
      this.usuario = this.authService.getDatauser();
      console.log(this.usuario);
      this.loading = true;
    }, 1000);
  }

  openDialog(){

    this.dialog.open(ProfiledialogComponent, {
      width: '650px',
      height: '400px',
    } )
  }
  return(){
    this.router.navigate(['/main'])
  }
  inicio() {
    let data = this.usuario.email
    console.log(this.usuario.email);

    return this.http.post('http://127.0.0.1:8000/api/datauser', data)
      .subscribe((response) => {
        this.usuario = response;
      },
        error => {
        });
  }
}
