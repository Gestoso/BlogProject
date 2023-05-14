import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor (
    private http: HttpClient,
    private app: AppComponent,
        private userData: UserDataService,
        private router: Router
  ){

  }

registerForm = new FormGroup({
  name: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required]),

})

onSubmit(){

  const name = this.registerForm.controls['name'].value;
  const email = this.registerForm.controls['email'].value;
  const password = this.registerForm.controls['password'].value;

  let userdata = {
    name: name,
    email: email,
    password: password
  }
  return this.http.post('http://127.0.0.1:8000/api/register', userdata).subscribe((response) => {
    this.userData.setuserdata(response);
    this.router.navigate(['/main']);
  })

}

}
