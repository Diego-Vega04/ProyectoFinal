import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosOriginales: Producto[] = [];
  nombreBusqueda: string = '';

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
    console.log("Productos cargados");
  }

  getProductos() {
    this.productoService.getProductos().subscribe(data => {
      this.productosOriginales = data;
      this.productos = data;
    });
  }

  buscarProducto() {
    const termino = this.nombreBusqueda.toLowerCase().trim();

    if (termino === '') {
      this.productos = this.productosOriginales;
    } else {
      this.productos = this.productosOriginales.filter(producto =>
        producto.nombre.toLowerCase().includes(termino)
      );
    }
  }

  delete(producto: Producto): void {
    Swal.fire({
      title: "Está seguro?",
      text: `¿Seguro que desea eliminar al producto ${producto.nombre} - ${producto.categoria}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, borrar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true

    }).then((result) => {
      if (result.value && producto.id != undefined) {
        this.productoService.delete(producto.id).subscribe(
          response => {
            this.productos = this.productos.filter(pro => pro !== producto)
            Swal.fire(
              'Producto Eliminado',
              `Producto ${producto.nombre} eliminado con exito`,
              'success'
            )
          }
        )
      }
    });
  }
}
