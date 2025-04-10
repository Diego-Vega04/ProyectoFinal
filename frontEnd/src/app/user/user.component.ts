import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  //Seccion mis datos
  userName: string | null = "";
  userLastName: string | null = "";
  userEmail: string | null = "";

  showPassword1 = false;
  showPassword2 = false;
  showPassword3 = false;

  editar: boolean = true;  //true = desahibilitado
  psswd: boolean = true;

  //Centro de soporte
  contact = {
    name: '',
    email: '',
    message: ''
  };

  selectedSection: string = 'mis-datos';

  selectSection(section: string) {
    this.selectedSection = section;
  }

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.userName = this.authService.getUserName() ? this.authService.getUserName() : 'Nombre no encontrado';
    this.userLastName = this.authService.getUserLastName() ? this.authService.getUserLastName() : 'Apellido no encontrado';
    this.userEmail = this.authService.getUserEmail() ? this.authService.getUserEmail() : 'Email no encontrado';
  }

  //Seccion mis datos y mis direcciones
  onSubmit() {
    if (this.editar) {
      this.update();
    }
  }

  //Método para actualizar los datos del usuario
  update() {
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
    console.log("editPsswd");
    //llamada al serivicio update del usuario 
  }

  //Seccion direcciones
  editDir(){ 
    //guardar la nueva direccion en el objeto del usuario
    this.editar = !this.editar;
  }

  //Seccion devoluciones
  solicitarDevolucion() {
    console.log('Solicitando devolución...');
  }
  
  contactarSoporte() {
    console.log('Contactando con soporte...');
  }
  
  sendContact() {
    console.log('Mensaje enviado:', this.contact);
  }

  pedidos = [
    { id: 1, fecha: '2023-04-01', direccion: 'c/inventada nº2' },
    { id: 2, fecha: '2023-04-03', direccion: 'c/inventada nº2' },
    { id: 3, fecha: '2023-04-05', direccion: 'c/inventada nº2' },
    { id: 4, fecha: '2023-04-07', direccion: 'c/inventada nº2'},
  ];

  // Método para ver los detalles del pedido (actualmente solo un console.log, cambiar a un swal¿?)
  viewDetails(pedido: any) {
    console.log('Ver detalles del pedido con un swal:', pedido);
  }

   // Método para cerrar sesión
   onLogout(): void {
    this.authService.logout();
    console.log('Sesión cerrada');
  }
}
