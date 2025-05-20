import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  

  // cambiar a tipo producto y las rutas a las caracteristicas
  productosCesta = [
    {imagen: 'https://picsum.photos/200/300', nombre: 'Nombre1', precio: 20.00},
    {imagen: 'https://picsum.photos/200/300', nombre: 'Nombre2', precio: 40.00},
    {imagen: 'https://picsum.photos/200/300', nombre: 'Nombre3', precio: 30.00},
    {imagen: 'https://picsum.photos/200/300', nombre: 'Nombre4', precio: 43.22},
    {imagen: 'https://picsum.photos/200/300', nombre: 'Nombre5', precio: 46.50},
    {imagen: 'https://picsum.photos/200/300', nombre: 'Nombre6', precio: 50.00},
    {imagen: 'https://picsum.photos/200/300', nombre: 'Nombre7', precio: 40.00},
    {imagen: 'https://picsum.photos/200/300', nombre: 'Nombre8', precio: 80.00},
    {imagen: 'https://picsum.photos/200/300', nombre: 'Nombre9', precio: 90.00},
    {imagen: 'https://picsum.photos/200/300', nombre: 'Nombre10', precio: 100.00}

  ]; 

  isDarkMode = false;

  nombreBusqueda: string = '';
  //productos: Producto[] = []; ->descomentar cuando la entidad exista 
  //productosOG: Producto[] = [];

  constructor(public authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

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

  borrarProducto(index: number){
    this.productosCesta.splice(index, 1); //revisar cuando este el servicio de producto

    this.snackBar.open('Producto eliminado de la cesta', 'Cerrar', {
      duration: 300000, 
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-inferior'] 
    });    
  }

  vaciarCesta(){
    this.productosCesta = [];
  }
}