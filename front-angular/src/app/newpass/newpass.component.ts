import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CodepassComponent } from '../codepass/codepass.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.css']
})
export class NewpassComponent implements OnInit{
  id: any;
  user: any;
  loading = false;
  constructor(
    private router : Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ){

  }
  ngOnInit(): void {
    this.dialog.open(CodepassComponent, {
      width:'500px',
      height:"500px",
      disableClose: true
    });
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id);
setTimeout(() => {
  this.http.get(`http://127.0.0.1:8000/api/getuser/${this.id}`).subscribe((response)=>
  this.user = response
    );
}, 1000);

  this.loading = true;
  }
  recoverForm = new FormGroup({
    password: new FormControl ('',  [Validators.required])
  });

  onSubmit(){

    const id = this.user.id;
    const password = this.recoverForm.controls['password'].value;

    let data = {
      id: id,
      password: password,

    }

    this.http.post('http://127.0.0.1:8000/api/changepass', data).subscribe((response)=>
    response
    );
    Swal.fire({
      icon: 'success',
      title: 'La contraseña se ha cambiado correctamente!'
    });
    setTimeout(() => {
      this.router.navigate(['/login']);
    this.loading = true;
    }, 1000);

  }
}
