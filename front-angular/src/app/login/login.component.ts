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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private app: AppComponent,
    private http: HttpClient,
    private userdata: UserDataService,
    private router: Router
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
        this.userdata.setuserdata(response);
        this.router.navigate(['/main']);
      });
  }
}
