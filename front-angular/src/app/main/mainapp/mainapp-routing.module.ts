import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { ProfileComponent } from '../profile/profile.component';
import { BlogdetailsComponent } from '../blogdetails/blogdetails.component';
import { CategoriasComponent } from '../categorias/categorias.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'details', component: BlogdetailsComponent},
  {path: 'categorias', component: CategoriasComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainappRoutingModule { }
