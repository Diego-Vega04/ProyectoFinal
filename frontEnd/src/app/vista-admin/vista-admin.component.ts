import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-admin',
  standalone: false,
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent {

  gestionProduct: boolean = true;
  editProduct = new Map<number, boolean>();

  productos = [
    { id: 1, nombre: 'Camiseta', precio: 19.99, stock: 20 },
    { id: 2, nombre: 'Pantalón', precio: 39.99, stock: 15 },
    { id: 3, nombre: 'Zapatillas', precio: 59.99, stock: 10 },
    { id: 4, nombre: 'Chaqueta', precio: 79.99, stock: 5 },
  ];

  gestionProductos() {
    this.gestionProduct = !this.gestionProduct;
  }

  editarProducto(id: number) {
    const actual = this.editProduct.get(id) || false;
    this.editProduct.set(id, !actual);
  }

  eliminarProducto() {
    Swal.fire({
      title: "¿Eliminar este producto de la base de datos?",
      text: "Esta acción no se podrá reveritr",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Producto eliminado",
          text: "El producto ha sido eliminado correctamente.",
          icon: "success"
        });
      }
    });
  }
}
