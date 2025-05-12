import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from '../search.service';
import { Producto } from '../models/producto';
import { CarritoEstadoService } from '../services/carrito-estado.service';
import { User } from '../models/user';
import { Carrito } from '../models/carrito';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  menuOpen = false;
  cartMenuOpen: boolean = false;
  menuAbierto = false;
  isLoggedIn: boolean = false;
  isDarkMode = false;
  nombreBusqueda: string = '';
  productosCesta: Producto[] = [];


  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
    private snackBar: MatSnackBar,
    private carritoEstadoService: CarritoEstadoService,
    private searchService: SearchService,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    this.productosCesta = this.carritoEstadoService.getProductos();

    const email = this.authService.getUsuario();
    if (!email) return;

    this.http.get<User>(`/api/users/email/${email}`).subscribe(user => {
      this.http.get<Carrito>(`/api/carritos/user/${user.id}`).subscribe(carrito => {
        this.productosCesta = carrito.productos;
      });
    });
  }

  // Función para alternar el menú lateral
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.menuAbierto = !this.menuAbierto;
  }

  // Función para alternar el menú lateral de la cesta
  toggleCartMenu(): void {
    this.cartMenuOpen = !this.cartMenuOpen;
  }

  closeMenus() {
    this.menuOpen = false;
    this.cartMenuOpen = false;
  }

  //Funciones para login y logout
  async irAUser() {
    const loggedIn = await this.keycloakService.isLoggedIn();

    if (loggedIn) {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(event: MouseEvent): void {
    event.stopPropagation(); // Evita que también se dispare irAUser()
    this.keycloakService.logout(window.location.origin);
  }

  //Modo claro oscuro
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;

    if (this.isDarkMode) {
      body.setAttribute('data-tema', 'oscuro');
    } else {
      body.removeAttribute('data-tema');
    }
  }

  //Función para la barra de búsqueda:
  buscarProducto() {
    const termino = this.nombreBusqueda.toLowerCase().trim();
    this.searchService.setSearchTerm(termino);
  }

  //Cesta
  borrarProducto(index: number) {
    this.carritoEstadoService.eliminarProducto(index);
    this.productosCesta = this.carritoEstadoService.getProductos();

    this.snackBar.open('Producto eliminado de la cesta', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-inferior']
    });
  }

  vaciarCesta() {
    this.carritoEstadoService.vaciarCarrito();
    this.productosCesta = [];
  }

  irCesta() {
    this.router.navigate(['/cesta']);
    this.closeMenus();
  }
}