import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main/main.component';


import { UserDataService } from './user-data.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './main/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ProfiledialogComponent } from './main/profiledialog/profiledialog.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogdetailsComponent } from './main/blogdetails/blogdetails.component';
import { CategoriasComponent } from './main/categorias/categorias.component';
import { DatePipe } from '@angular/common';
import { UsuarioComponent } from './main/usuario/usuario.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { RecoverComponent } from './recover/recover.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    ProfileComponent,
    ProfiledialogComponent,
    FooterComponent,
    NavbarComponent,
    BlogdetailsComponent,
    CategoriasComponent,
    UsuarioComponent,
    LoadingPageComponent,
    RecoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    DatePipe
  ],
  providers: [
    UserDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
