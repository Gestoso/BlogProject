import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  user_id: any;
  usuario: any

  constructor(
    private router : Router,
    private http: HttpClient,
    private route: ActivatedRoute,
  ){

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['id'];
      console.log(this.user_id);

      this.http.get('http://127.0.0.1:8000/api/ususeleccionado', {params: {user_id: this.user_id}}).subscribe(response => {
        this.usuario = response;
        console.log(this.usuario);
      });
    });
  }

}
