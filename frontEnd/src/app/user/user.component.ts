import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { KeycloakService } from 'keycloak-angular';
import { User } from '../models/user';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user!: User;

  //Seccion mis datos
  userName: string | null = "";
  userLastName: string | null = "";
  userEmail: string | null = "";
  userDireccion: string | null = "";

  editarDatos: boolean = true; //Para datos personales
  editarDireccion: boolean = true;

  motivo = '';
  devolucionMode = false;

  pedidos: Pedido[] = [];
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

  constructor(
    public authService: AuthService,
    public keycloakService: KeycloakService,
    public userService: UserService
  ) { }

  ngOnInit() {
    const email = this.authService.getEmail();
    if (email) {
      this.userService.getByEmail(email).subscribe({
        next: (user) => {
          this.user = user;
          this.userName = user.nombre;
          this.userLastName = user.apellidos;
          this.userEmail = user.email;
          this.userDireccion = user.direccion;

          this.pedidos = user.pedidos ?? [];
        },
        error: (err) => {
          console.error('Error cargando usuario:', err);
        }
      });
    } else {
      console.error('No se encontró el email del usuario en Keycloak');
    }
  }

  //Seccion mis datos y mis direcciones
  onSubmit() {
    if (this.editarDatos || this.editarDireccion) {
      this.update();
    }
  }

  //Método para actualizar los datos del usuario
  update() {
    if (!this.editarDatos) {
      // Guardar
      this.user.nombre = this.userName ?? '';
      this.user.apellidos = this.userLastName ?? '';
      this.user.email = this.userEmail ?? '';

      this.userService.updateUser(this.user).subscribe({
        next: (updatedUser) => {
          console.log('Usuario actualizado:', updatedUser);
          Swal.fire('Guardado', 'Tus datos se han actualizado correctamente.', 'success');
          this.editarDatos = true;
        },
        error: (err) => {
          console.error('Error actualizando usuario:', err);
          Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
        }
      });
    } else {
      // Cambiar a modo edición
      this.editarDatos = false;
    }
  }

  //Seccion direcciones
  editDir() {
    if (!this.editarDireccion) {
      this.user.direccion = this.userDireccion ?? '';

      this.userService.updateUser(this.user).subscribe({
        next: (updatedUser) => {
          console.log('Usuario actualizado:', updatedUser);
          Swal.fire('Guardado', 'Tus direcciones se han actualizado correctamente.', 'success');
          this.editarDireccion = true;
        },
        error: (err) => {
          console.error('Error actualizando usuario:', err);
          Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
        }
      });
    } else {
      this.editarDireccion = false;
    }
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
    Swal.fire('¡Listo!', 'Tu solicitud de devolución se ha enviado.', 'success');
    this.devolucionMode = false;
    this.selectSection('pedidos');

  }

  cancelarDevolucion() {
    this.devolucionMode = false;
    this.motivo = '';
  }

  sendContact() {
    console.log('Mensaje enviado:', this.contact);
  }

  // Método para cerrar sesión
  logout(): void {
    this.keycloakService.logout(window.location.origin);
  }
}
