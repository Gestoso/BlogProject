import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main/main.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', loadChildren: () => import('./main/mainapp/mainapp.module').then((m) => m.MainappModule) },
  {path: '**', pathMatch: 'full', redirectTo: 'register'},
  {path: '', pathMatch: 'full', redirectTo: 'login'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
