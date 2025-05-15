import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private keycloakService: KeycloakService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const loggedIn = await this.keycloakService.isLoggedIn();

    if (!loggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    // Revisa si se definió un rol requerido en la ruta
    const requiredRoles: string[] = route.data['roles'];

    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.some(role =>
        this.keycloakService.isUserInRole(role)
      );

      if (!hasRole) {
        this.router.navigate(['/']);
        return false;
      }
    }

    return true;
  }
}
