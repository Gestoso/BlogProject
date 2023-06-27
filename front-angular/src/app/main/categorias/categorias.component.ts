import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent  implements OnInit, AfterContentInit{
  categoria: any;
  blogs: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {

  }
  ngAfterContentInit(): void {
    setTimeout(() => {
      console.log(this.categoria.name);

      this.http.get('http://127.0.0.1:8000/api/getblogs', { params: { categoria: this.categoria.name } }).subscribe(response => {
        console.log(response);

    this.blogs = response;
    console.log(this.blogs);

    });
    }, 1000);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(categoria => {
      console.log(categoria);
      this.categoria = categoria
    });





  }

}
