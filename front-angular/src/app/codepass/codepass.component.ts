import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { NewpassComponent } from '../newpass/newpass.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-codepass',
  templateUrl: './codepass.component.html',
  styleUrls: ['./codepass.component.css']
})
export class CodepassComponent implements OnInit{
code: any;
codeback: any
id: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialogRef<CodepassComponent>
  ) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id);
    setTimeout(() => {
      this.http.get(`http://127.0.0.1:8000/api/getcode/${this.id}`).subscribe((response)=> {
      console.log("Response", response);
      this.codeback = response;
    });
    }, 1000);

  }


  codepassword = new FormGroup({
    codepass: new FormControl('', [Validators.required])
  });

  onSubmit(){
    this.code = this.codepassword.controls['codepass'].value;
    console.log("Codigo del forms " + this.code + " Codigo del back " + this.codeback);

    if (this.code == this.codeback) {
      this.dialog.close();
    }

  }

}
