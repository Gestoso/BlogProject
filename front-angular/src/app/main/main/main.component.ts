import { HttpClient } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/auth.service';
import { UserDataService } from 'src/app/user-data.service';
import { ProfileComponent } from '../profile/profile.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginComponent } from 'src/app/login/login.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  usuario: any;
  email: any;
  thereis = false;
  blog: any;
  blogtmp: any;
  contenidotmp: any;
  modoEdicion = false;
  contenido: any;
  categorias: any;
  textareavalue: string = '';
  loading = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
  ){
  }
  ngOnInit() {
    setTimeout(() => {
      this.usuario = this.auth.getDatauser();
      this.blog = this.auth.getDataBlog();
      try {

        this.contenidotmp = this.blog.contenido;
      } catch (error) {
      }
      console.log(this.blog);
      console.log(this.usuario);


      this.categorias = this.auth.getCategorias();
      if (this.blog != null){
        this.thereis = true;
      }
      this.loading =true;
    }, 1000);  }

  createblog = new FormGroup({
    title: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    contenido: new FormControl('', [Validators.required]),
  })


  create() {
    const title = this.createblog.controls['title'].value;
    const categoria = this.createblog.controls['categoria'].value;
    const contenido = this.createblog.controls['contenido'].value;

    let blogdata = {
      title: title,
      categoria: categoria,
      contenido: contenido,
      user_id: this.usuario.id
    }
    console.log(blogdata);

    this.http.post('http://127.0.0.1:8000/api/createblog', blogdata).subscribe(response => {

      this.auth.setDataBlog(response);
    console.log(this.blog);
    this.thereis = true;
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);

  }




  contblog = new FormGroup({
    contenido: new FormControl('', [Validators.required])
  });
  editsave() {

    const contenido = this.contblog.controls['contenido'].value;

    let data = {
      contenido: contenido,
      blog_id: this.blog.blog_id
    }

    this.textareavalue =  '';
    this.http.post('http://127.0.0.1:8000/api/continueblog', data).subscribe(response => {
      this.blogtmp = response;
      this.blog = this.blogtmp.blog
      console.log(this.blog);
      console.log(this.auth.getDataBlog());
    this.modoEdicion = false;


    });
  }

  deleteblog() {
    let data = {
      blog_id: this.blog.blog_id
    }
    console.log(data);

    this.http.post('http://127.0.0.1:8000/api/deleteblog', data).subscribe( {

    });
    setTimeout(() => {
      window.location.reload();
    }, 500);

  }

  detalles() {
this.router.navigate(['/main/details']);
  }

  categoriasc(name: string): string {
    console.log(name);

    this.router.navigate(['/main/categorias'], {queryParams: {name}});
    return name;
  }

}
