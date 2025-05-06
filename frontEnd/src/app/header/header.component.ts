import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
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

  isLoggedIn: boolean = false;

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

  constructor(private keycloakService: KeycloakService, private router: Router, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
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
      duration: 3000, 
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-inferior'] 
    });    
  }

  vaciarCesta(){
    this.productosCesta = [];
  }

  irCesta(){
    this.router.navigate(['/cesta']);
    this.closeMenus();
  }
}