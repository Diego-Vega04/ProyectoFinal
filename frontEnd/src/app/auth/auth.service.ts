import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloak: KeycloakService) { }

  // Verifica si el usuario está logueado
  public isLoggedIn(): Promise<boolean> {
    return Promise.resolve(this.keycloak.isLoggedIn());
  }

  // Inicia el proceso de login
  public login(redirectUri?: string): Promise<void> {
    return this.keycloak.login({
      redirectUri: redirectUri || window.location.origin
    });
  }

  // Cierra la sesión
  public logout(): Promise<void> {
    return this.keycloak.logout(window.location.origin);
  }
}