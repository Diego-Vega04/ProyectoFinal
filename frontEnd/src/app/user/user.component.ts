import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userName: string | null = "";
  userLastName: string | null = "";
  userEmail: string | null = "";

  showPassword1 = false;
  showPassword2 = false;
  showPassword3 = false;

  editar: boolean = true;  //true = desahibilitado
  psswd: boolean = true;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.userName = this.authService.getUserName() ? this.authService.getUserName() : 'Nombre no encontrado';
    this.userLastName = this.authService.getUserLastName() ? this.authService.getUserLastName() : 'Apellido no encontrado';
    this.userEmail = this.authService.getUserEmail() ? this.authService.getUserEmail() : 'Email no encontrado';
  }

  onSubmit() {
    if (this.editar) {
      this.update();
    }

  }

  update() {
    //metodo para actualizar los datos del usuario
    console.log('Nombre:', this.userName);
    console.log('Apellido:', this.userLastName);
    console.log('Email:', this.userEmail);

    this.editar = !this.editar;
  }

  togglePasswordVisibility(index: number) {
    switch (index) {
      case 1: this.showPassword1 = !this.showPassword1; break;
      case 2: this.showPassword2 = !this.showPassword2; break;
      case 3: this.showPassword3 = !this.showPassword3; break;
    }
  }

  editPsswd() {
    console.log("click");
    //recoger datos de los inputs
  }
}
