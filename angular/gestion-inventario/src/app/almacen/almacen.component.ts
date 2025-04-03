import { Component, OnInit } from '@angular/core';
import { Producto } from '../productos/producto';
import { ProductoService } from '../productos/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-almacen',
  standalone: false,
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.css'
})
export class AlmacenComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.addClickEventToRackCells();
  }

  addClickEventToRackCells() {

    document.querySelectorAll('.rack').forEach(cell => {
      cell.addEventListener('click', () => {

        this.productoService.getProductosUbi(cell.id).subscribe(
          (data) => {
            console.log('Productos en la ubicación ' + cell.id + ':', data);

            let tableHtml = `
              <style>
                .tablaAlert {
                  width: 100%;
                  border-collapse: collapse;
                }
                .tablaAlert th, .tablaAlert td {
                  padding: 8px 12px;
                  text-align: center;
                  border: 1px solid #ddd;
                }
                .tablaAlert th {
                  background-color: #87CEEB;
                  color: white;
                }
                .tablaAlert td {
                  background-color: #f9f9f9;
                }
                .tablaAlert tr:hover td {
                  background-color: #f1f1f1;
                }
              </style>
              <table class="tablaAlert">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                  </tr>
                </thead>
                <tbody>`;

            this.productoService.getProductosUbi(cell.id).subscribe(
              (data) => {
                data.forEach((producto: Producto) => {
                  tableHtml += `
        <tr>
          <td>${producto.id}</td>
          <td>${producto.nombre}</td>
          <td>${producto.cantidad}</td>
          <td>${producto.precio}</td>
          <td>${producto.categoria}</td>
        </tr>
      `;
                });

                tableHtml += '</tbody></table>';

                // Mostrar la tabla con los productos en el Swal
                Swal.fire({
                  title: "Apartado " + cell.id,
                  width: 1000,
                  html: tableHtml,
                  showCloseButton: true,
                  showConfirmButton: false
                });
              },
              (error) => {
                console.error('Error al obtener productos:', error);
              }
            );


          });
      });
    }
    )
  }
}
