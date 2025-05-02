import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

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

  userPhotoUrl: string | null = null; 

  showPassword1 = false;
  showPassword2 = false;
  showPassword3 = false;

  editar: boolean = true;  //true = desahibilitado
  psswd: boolean = true;

  motivo = '';
  devolucionMode = false;

  //Pedidos para pruebas
  pedidos = [
    {
      id: 1,
      fecha: '2023-04-20',
      direccion: 'Calle Falsa 123',
      productos: [
        { nombre: 'Teclado', precio: 20.00, cantidad: 1 },
        { nombre: 'Ratón', precio: 10.00, cantidad: 2 }
      ]
    },
    { id: 2, fecha: '2023-04-03', direccion: 'c/inventada nº2' },
    { id: 3, fecha: '2023-04-05', direccion: 'c/inventada nº2' },
    { id: 4, fecha: '2023-04-07', direccion: 'c/inventada nº2' },
  ];
  pedidoSeleccionado: any = null;

  //Centro de soporte
  contact = {
    name: '',
    email: '',
    message: ''
  };

  selectedSection: string = 'mis-datos';

  selectSection(section: string, pedido?: any) {
    this.selectedSection = section;

    if (pedido) this.pedidoSeleccionado = pedido;

    if (section === 'pedidos') {
      this.pedidoSeleccionado = null;
      this.devolucionMode = false;
      this.motivo = '';
    }
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

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userPhotoUrl = e.target.result; 
      };
      reader.readAsDataURL(file);
    }
  }

  //Seccion direcciones
  editDir() {
    //guardar la nueva direccion en el objeto del usuario
    this.editar = !this.editar;
  }

  //Seccion devoluciones
  solicitarDevolucion() {
    Swal.fire({
      title: "Devoluciones",
      icon: "info",
      text: "Las devoluciones se solicitan desde el detalle del pedido a devolver",
      showCancelButton: true,
      confirmButtonText: "Ir al historial de pedidos",
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectSection('pedidos');
        setTimeout(() => {
          const sc = document.getElementById('pedidos');
          if (sc) {
            sc.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }
    });
  }

  //Formulario devolucion
  enviarDevolucion() {
    /*con pedidoService implementado
    this.pedidoService.solicitarDevolucion(this.pedidoSeleccionado.id, { motivo: this.motivo })
      .subscribe(() => {
        Swal.fire('¡Listo!', 'Tu solicitud de devolución se ha enviado.', 'success');
        this.devolucionMode = false;
        this.selectSection('pedidos');
      }, err => {
        Swal.fire('Error', 'Hubo un problema al enviar la solicitud.', 'error');
      });
      */
      console.log("devolucion")
  }

  cancelarDevolucion() {
    this.devolucionMode = false;
    this.motivo = '';
  }


  sendContact() {
    console.log('Mensaje enviado:', this.contact);
  }

  // Método para cerrar sesión
  onLogout(): void {
    this.authService.logout();
    console.log('Sesión cerrada');
  }
}
