import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword: boolean = false;
  esRegistro: boolean = false; // false = iniciar sesión, true = crear cuenta

  onSubmit() {
    if (this.esRegistro) {
      console.log("Crear cuenta");
    } else {
      console.log("Iniciar sesión");
    }
  }

  alternarModo() {
    this.esRegistro = !this.esRegistro;
  }
  
  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

}
