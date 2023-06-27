import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.css']
})
export class BlogdetailsComponent implements OnInit {
  blog: any;
  diac: any;
  horac: any;
  diau: any;
  horau: any;

  constructor(
    private router : Router,
    private auth: AuthService
  ){

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.blog = this.auth.getDataBlog();
      const datec = new Date(this.blog.created_at);
      const dateu = new Date(this.blog.updated_at);
    this.diac = datec.toLocaleDateString();
    this.horac = datec.toLocaleTimeString();
    this.diau = dateu.toLocaleDateString();
    this.horau = dateu.toLocaleTimeString();
    }, 500);

  }




}
