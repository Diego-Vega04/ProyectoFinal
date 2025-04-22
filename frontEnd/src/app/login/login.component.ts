import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  login(): void {
    this.keycloakService.login();
  }

  logout(): void{
    this.keycloakService.logout();
  }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const loggedIn: boolean = this.keycloakService.isLoggedIn();
  
    if (loggedIn) {
      const redirectUrl = localStorage.getItem('redirectUrl');
  
      if (redirectUrl && redirectUrl !== '/login') {
        this.router.navigateByUrl(redirectUrl);
        localStorage.removeItem('redirectUrl');
      } else {
        console.log('Usuario ya logueado pero sin redirect previo');
      }
    }
  }
}
