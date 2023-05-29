import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { UserDataService } from '../user-data.service';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';
interface ApiResponse {
  result: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  token = this.auth.getTokenuser();

  result: any;
  usuario: any;
  blog: any;
  constructor(
    private app: AppComponent,
    private http: HttpClient,
    private userdata: UserDataService,
    private router: Router,
    private auth: AuthService,
    private guard: AuthGuard
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    let userData = {
      email: email,
      password: password,
    };
    return this.http
    .post('http://127.0.0.1:8000/api/login', userData)
    .subscribe((response) => {
      this.usuario = response;
      this.auth.setToken(this.usuario.token);
      console.log(this.usuario);
      console.log(this.token);

      this.guard.setIsLoggedIn;
      this.router.navigate(['/main']);
      localStorage.setItem('data', JSON.stringify(userData));
      localStorage.getItem("data");




    },
      (error) => {
        this.result = 'Estos datos son incorrectos';
        this.loginForm.reset();
      }
      );
  }

  register(){
    this.router.navigate(['/register']);
  }
}
