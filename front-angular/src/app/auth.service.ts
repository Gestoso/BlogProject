import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const token = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly clave_fecha = 'tokenExpiration';
  private readonly token = 'nombretoken';
  private data: any;
  datauser: any;
  categorias: any;

  setCategorias(value: any) {
    this.categorias = value;
  }

  getCategorias() {
    return this.categorias;
  }
  setDataBlog(value: any) {
    this.data = value;
  }

  getDataBlog() {
    return this.data;
  }

  setDatauser(value: any) {
    this.datauser = value;
  }

  getDatauser() {
    return this.datauser;
  }
  getemailDatauser() {
    return this.data.email;
  }

  getTokenuser(){
    return localStorage.getItem(token);
  }

  setToken(tokenpasado: any){
    localStorage.setItem(token, tokenpasado);
  }

  removeToken(): void {


    localStorage.removeItem(this.data.token);
  }

  isAuthenticated(): boolean {
    const token = this.getTokenuser();
    // Aquí puedes agregar la lógica para validar si el token es válido
    return !!token;
  }
  getAuthHeaders(): HttpHeaders {
    const token = this.getTokenuser();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
