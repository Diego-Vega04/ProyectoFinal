import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
    //return true; 
  }

  //Obtener los datos del usuario logueado, 
  // es posible que haya que cambiarlo al unir el front con el back

  getUserName(): string | null {
    this.user.nombre = "nombrePrueba"; //pruebas
    return this.user.nombre || null;
  }

  getUserLastName(): string | null {
    this.user.apellidos = "apellidoPrueba"; //pruebas
    return this.user.apellidos || null;
  }
  
  getUserEmail(): string | null {
    this.user.email = "emailPrueba"; //pruebas
    return this.user.email || null;
  }

  logout() {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');  
    
    this.router.navigate(['/']); //redirige a home
  }
}
