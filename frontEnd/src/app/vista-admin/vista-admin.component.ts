import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-vista-admin',
  standalone: false,
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent {
  gestionProduct: boolean = false;
  editProduct = new Map<number, boolean>();

  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService
  ) { }

  gestionProductos() {
    this.gestionProduct = !this.gestionProduct;

    this.productoService.getAllProductos().subscribe({
      next: (products) => {
        this.productos = products;
        console.log('Productos cargados:', products);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    })
  }

  editarProducto(producto: Producto) {
    const isEditing = this.editProduct.get(producto.id!) || false;

    if (isEditing) {
      this.productoService.updateProducto(producto).subscribe({
        next: () => {
          this.editProduct.set(producto.id!, false);
          console.log('Producto actualizado:', producto);

          Swal.fire({
            title: "Producto guardado",
            text: "Producto con ID " + producto.id + " guardado correctamente",
            icon: "success",
            confirmButtonColor: "#8a56ac",
          });
        },
        error: (err) => {
          console.error('Error al actualizar el producto', err);
        }
      });
    } else {
      this.editProduct.set(producto.id!, true);
    }
  }

  eliminarProducto(id: number) {
  Swal.fire({
    title: "¿Eliminar este producto de la base de datos?",
    text: "Esta acción no se podrá revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#8a56ac",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borrar"
  }).then((result) => {
    if (result.isConfirmed) {
      this.productoService.deleteProducto(id).subscribe({
        next: () => {
          this.productos = this.productos.filter(p => p.id !== id);

          Swal.fire({
            title: "Producto eliminado",
            text: "El producto ha sido eliminado correctamente.",
            icon: "success"
          });
        },
        error: (err) => {
          console.error('Error al eliminar el producto', err);
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el producto.",
            icon: "error"
          });
        }
      });
    }
  });
}

}
