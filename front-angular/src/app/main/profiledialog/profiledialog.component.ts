import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-profiledialog',
  templateUrl: './profiledialog.component.html',
  styleUrls: ['./profiledialog.component.css']
})
export class ProfiledialogComponent implements OnInit {
  usuario: any;
  constructor(
    private auth: AuthService,
    private guard: AuthGuard,
    private http: HttpClient
  )
   {
   }

  ngOnInit(): void {
  }

  guardarusu = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    conf_password: new FormControl('', [Validators.required])
  })

  guardar() {
const name = this.guardarusu.controls['name'].value;
const email = this.guardarusu.controls['email'].value;
const password = this.guardarusu.controls['password'].value;
const conf_password = this.guardarusu.controls['conf_password'].value;
if (password == conf_password || (password == null && conf_password == null))
{
  let data = {
  name: name,
  email: email,
  id: this.usuario.id,
  password: password,
}

return this.http.post('http://127.0.0.1:8000/api/editarusu', data)
  .subscribe(response => {
    console.log(response);
    this.usuario = response;
  });
} else {
  alert('Las contraseñas no coinciden');
}
 return 1;
}
}
