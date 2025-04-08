import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
    //return true; 
  }

  //Obtener los datos del usuario logueado, 
  // es posible que haya que cambiarlo al unir el front con el back

  getUserName(): string | null {
    this.user.nombre = "nombre"; //pruebas
    return this.user.nombre || null;
  }

  getUserLastName(): string | null {
    this.user.apellidos = "apellido"; //pruebas
    return this.user.apellidos || null;
  }
  
  getUserEmail(): string | null {
    this.user.email = "email"; //pruebas
    return this.user.email || null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}
