import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  isDarkMode = false;

  nombreBusqueda: string = '';
  //productos: Producto[] = []; ->descomentar cuando la entidad exista 
  //productosOG: Producto[] = [];

  constructor(public authService: AuthService, private router: Router) { }

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

  onMiCuentaClick() {
    if (!this.authService.isLoggedIn()) {
      // Si no está logueado, redirige al login
      this.router.navigate(['/login']);
    } else {
      // Si está logueado, lleva a la página del user
      this.router.navigate(['/user']);
    }
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

  //Función para la barra de búsqueda: (descomentar cuando estén implementadas las entidades y servicios en front)
  buscarProducto(){
    const termino = this.nombreBusqueda.toLowerCase().trim();

    if (termino === '') {
      //this.productos = this.productosOriginales;
    } else {
      console.log(termino);
      //this.productos = this.productosOriginales.filter(producto =>
      //  producto.nombre.toLowerCase().includes(termino)
      //);
    }
  }
}