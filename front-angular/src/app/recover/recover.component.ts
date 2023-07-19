import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent {
  email: any;
  constructor(
    private http: HttpClient
  ) {

  }

  recoverForm = new FormGroup ({
    email: new FormControl ('',[Validators.required, Validators.email])
  })

  onSubmit() {
     this.email = this.recoverForm.controls['email'].value;
    console.log(this.email);

    this.http.post('http://127.0.0.1:8000/api/recover', { email: this.email })
    .subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
    console.log("fet");

  }

}
