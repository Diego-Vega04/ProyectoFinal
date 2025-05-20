import { Component } from '@angular/core';

@Component({
  selector: 'app-vista-admin',
  standalone: false,
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent {

  gestionProduct: boolean = true

  gestionProductos() {
     this.gestionProduct = !this.gestionProduct;
  }

  productos = [
    { id: 1, nombre: 'Camiseta', precio: 19.99, stock: 20 },
    { id: 2, nombre: 'Pantalón', precio: 39.99, stock: 15 },
    { id: 3, nombre: 'Zapatillas', precio: 59.99, stock: 10 },
    { id: 4, nombre: 'Chaqueta', precio: 79.99, stock: 5 },
  ];
}
