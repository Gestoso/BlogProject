import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-angular';

  constructor(
    private auth: AuthService,
    private  http: HttpClient,
    private readonly router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
   }
  ngOnInit(): void {
  }
}
