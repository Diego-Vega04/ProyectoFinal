import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
    //return true; 
  }

  // Obtener el email del usuario logueado
  getUserEmail(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.email || null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}
