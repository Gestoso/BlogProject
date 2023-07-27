import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { NewpassComponent } from '../newpass/newpass.component';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-codepass',
  templateUrl: './codepass.component.html',
  styleUrls: ['./codepass.component.css'],
})
export class CodepassComponent implements OnInit {
  code: any;
  codeback: any;
  id: any;
  loading = false;
  block = false;
  cont = 3;
  contador: any;
  tiempo: any;
  key = 'intentos';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialogRef<CodepassComponent>
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    const storedContador = localStorage.getItem('contador');
    const expirationTime = localStorage.getItem('temporizador');

    if (storedContador !== null && expirationTime !== null) {
      this.tiempo = JSON.parse(expirationTime);
      this.contador = JSON.parse(storedContador);
      console.log('tiempo: ' + this.tiempo + ' y contador: ' + this.contador);

      this.timer();
    } else {
      this.contador = 3;
      if (storedContador == null) {
        localStorage.setItem('contador', JSON.stringify(this.contador));
      }
      console.log(this.contador);
    }

    this.loading = true;
  }

  timer() {
    if (this.contador < 1 && this.tiempo > 0) {
      Swal.fire({
        icon: 'warning',
        title:
          'Has agotado los tres intentos de introducir el codigo correcto, espera 30 minutos para volver a introducir el codigo.',
      });
      let intervalo = setInterval(() => {
        const currentTime = 1;
          this.tiempo = Math.floor(this.tiempo - currentTime);
          JSON.parse(this.tiempo);
          console.log('Tiempo restante:' + this.tiempo + 'segundos');
          localStorage.setItem('temporizador', JSON.stringify(this.tiempo));

        if (this.tiempo <= 0) {
          clearInterval(intervalo);
          this.contador = 3;
          localStorage.setItem('contador', JSON.stringify(this.contador))
          this.tiempo = 5;
      this.block = false;
      console.log(this.contador + this.tiempo);
        }
      }, 1000);
      this.block = true;
    }

  }

  codepassword = new FormGroup({
    codepass: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.code = this.codepassword.controls['codepass'].value;
    let data = {
      id: this.id,
      code: this.code,
    };
    this.http
      .post('http://127.0.0.1:8000/api/getcode', data)
      .subscribe((response) => {
        this.codeback = response;
        console.log(this.codeback);
        console.log(this.code);

      });
    this.loading = false;
      setTimeout(() => {


      if (this.code === this.codeback) {
        this.dialog.close();
        console.log('hola');

      } else {
        this.loading = true;
        let local = localStorage.getItem('contador');
        console.log(local);

        if (local !== null) {
          let contador = JSON.parse(local);
          console.log(contador);

          if (contador > 0) {
            this.contador--;
            contador--;
            console.log(contador);

            localStorage.setItem('contador', JSON.stringify(contador));
            Swal.fire({
              icon: 'error',
              title: 'Codigo Incorrecto, tienes ' + (1+contador) + ' intentos.',
            });
          } else {

            const expirationTime = new Date().getTime() + 5 * 1000;
            const currentTime = new Date().getTime();
            const remainingSeconds = Math.floor(
              (expirationTime - currentTime) / 1000
            );
            localStorage.setItem(
              'temporizador',
              JSON.stringify(remainingSeconds)
            );


          }
        }
        setTimeout(() => {
          window.location.reload();

        }, 1000);
      }
    }, 1000);

  }
}
