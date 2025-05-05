import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Obtener la URL de retorno de los parámetros de consulta
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Generar la URL completa para la redirección
    const redirectUri = window.location.origin + returnUrl;
    
    // Iniciar el proceso de login
    this.authService.login(redirectUri);
  }
}