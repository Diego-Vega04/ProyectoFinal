import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private keycloak: KeycloakService, private router: Router) { }

    hasRole(role: string): boolean {
        return this.keycloak.getUserRoles().includes(role);
    }

    isLoggedIn(): boolean {
        return this.keycloak.isLoggedIn();
    }

    getUsername(): string | undefined{
        return this.keycloak.getUsername();
    }

    checkLogin(): void {
      const loggedIn = this.keycloak.isLoggedIn();  
      if (!loggedIn && this.router.url !== '/login') {
        // Si el usuario no está logueado, redirigir a /login
        this.router.navigate(['/login']);
      }
    }
}