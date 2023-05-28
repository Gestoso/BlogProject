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
export class ProfileComponent implements OnInit{
  usuario: any;
  infousu: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private userdata: UserDataService,
    private dialog: MatDialog

  ){
    setInterval(() => {
      this.usuario = this.authService.getUser();
      console.log(this.usuario);

    }, 1000)

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
  ngOnInit(): void {
    this.usuario = this.authService.getUser();

  }

}
