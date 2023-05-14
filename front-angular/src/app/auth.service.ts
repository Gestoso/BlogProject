import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly clave_fecha = 'tokenExpiration';
  private readonly token = 'nombretoken';

  constructor() { }

  login(token: any, email: any): void {
    const fecha = new Date();
    fecha.setHours(fecha.getHours()+ 2);

    const userdata = {
      token: token,
      email: email
    }

    localStorage.setItem(this.clave_fecha, fecha.toISOString())
    localStorage.setItem(this.token, JSON.stringify(userdata));
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
      return localStorage.getItem(this.token) && usudata.token;

    }
    this.logout();
    return null;
  }

  getEmail(): string | null {
    const userdata = localStorage.getItem(this.token);
    if (userdata) {
      const usudata = JSON.parse(userdata);
      return localStorage.getItem(this.token) && usudata.email;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
