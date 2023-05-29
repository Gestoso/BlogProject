import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/auth.service';
import { UserDataService } from 'src/app/user-data.service';
import { ProfileComponent } from '../profile/profile.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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


  }
  ngOnInit(): void {
    setTimeout(() => {
      this.usuario = this.auth.getData();
      console.log(this.usuario.user.id);
    }, 2000);

  }

  createblog = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    contenido: new FormControl('', [Validators.required]),
  })


  onSubmit() {
    const name = this.createblog.controls['name'].value;
    const categoria = this.createblog.controls['categoria'].value;
    const contenido = this.createblog.controls['contenido'].value;

    let blogdata = {
      name: name,
      categoria: categoria,
      contenido: contenido,
      user_id: this.usuario.user.id
    }
    console.log(blogdata);

    this.http.post('http://127.0.0.1:8000/api/createblog', blogdata).subscribe(response => {
      this.blog = response
    console.log(this.blog);
    });

  }



}
