import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly clave_fecha = 'tokenExpiration';
  private readonly token = 'nombretoken';
  usuario = {token: null, email: null, name: null, id: null, password: null};
  blog = {blog_id: null, name: null, categoria: null, contenido: null, autor_id: null};
  value: any;
  constructor() { }


  setbloginfo(value: any){
    this.value = value;
  }
  getbloginfo(){
    return this.value
  }

  login( usuario: any, blog: any ): void {
    const fecha = new Date();
    fecha.setHours(fecha.getHours()+ 1);

    const generaldata = {
     userdata: {
      token: usuario.token,
      email: usuario.email,
      name: usuario.name,
      id: usuario.id,
      password: usuario.password
    },
    blogdata : {
      blog_id: blog.blog_id,
      name: blog.name,
      categoria: blog.categoria,
      contenido: blog.contenido,
      autor_id: blog.autor_id
    }
  }

    localStorage.setItem(this.clave_fecha, fecha.toISOString())
    localStorage.setItem(this.token, JSON.stringify(generaldata));
  }

  logout(): void {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.clave_fecha);
  }
  getToken(): string | null {
    const fecha = localStorage.getItem(this.clave_fecha);
    const userdata = localStorage.getItem(this.token);
    if (fecha && new Date() < new Date(fecha) && userdata) {
      const usudata = JSON.parse(userdata);
      return usudata.token;

    }
    this.logout();
    return null;
  }

  getUser(): { usuario: any } {
    const userdata = localStorage.getItem(this.token);
    if (userdata) {
      const usudata = JSON.parse(userdata);
      console.log(usudata);

      return { usuario: usudata.usuario };
    }
    return { usuario: null };
  }
  setUser(usuario: any ): void {
    const userdata = localStorage.getItem(this.token);
    if (userdata) {
      const usudata = JSON.parse(userdata);
      usudata.email = usuario.email;
      usudata.name = usuario.name;
      usudata.id = usuario.id;
      localStorage.setItem(this.token, JSON.stringify(usudata));
    }
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
