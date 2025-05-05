import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private keycloakService: KeycloakService) {}

  logout(): void {
    this.keycloakService.logout(window.location.origin);
  }
}
