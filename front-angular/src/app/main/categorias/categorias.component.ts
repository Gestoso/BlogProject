import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent  implements OnInit, AfterContentInit{
  categoria: any;
  blogs: any;
  hovered = false;
  loading = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  private datePipe: DatePipe,
  private router: Router
  ) {

  }

  hoversi() {
    this.hovered = true;
  }
  hoverno() {
    this.hovered = false;
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      console.log(this.categoria.name);
      this.http.get('http://127.0.0.1:8000/api/getblogs', { params: { categoria: this.categoria.name } }).subscribe(response => {
        console.log(response);
    this.blogs = response;
    console.log(this.blogs);
    for (let blog of this.blogs) {
      const updatedDate = new Date(blog.updated_at);
      const formattedDate = this.datePipe.transform(updatedDate, 'dd-MM-yyyy');
      blog.updated_at = formattedDate;
    }
    });
    this.loading = true;
    }, 1000);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(categoria => {
      console.log(categoria);
      this.categoria = categoria
    });
  }

  usuario(id: number){
console.log(id);

this.router.navigate(['/main/usuario/'+id], {queryParams: {id}});
return id;
  }

}
