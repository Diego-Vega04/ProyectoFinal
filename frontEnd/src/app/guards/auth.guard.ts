import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const loggedIn = await this.keycloakService.isLoggedIn();

    if (!loggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
