import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class Keycloakguard implements CanActivate {
  
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  canActivate(): boolean {
    if (!this.keycloakService.isLoggedIn()) {
        localStorage.setItem('redirectUrl', window.location.pathname);  // <-- esto está bien
        this.keycloakService.login();
        return false;
      }
    return true;
  }
}
