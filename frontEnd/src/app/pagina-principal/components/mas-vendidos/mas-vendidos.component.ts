import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Producto {
  nombre: string;
  precio: number;
  imagen: string;
  descuento?: number;  // Descuento opcional
  valoracion: number;
  opiniones: number;
}

@Component({
  selector: 'app-mas-vendidos',
  templateUrl: './mas-vendidos.component.html',
  styleUrls: ['./mas-vendidos.component.css'],
  imports: [CommonModule]
})
export class MasVendidosComponent implements OnInit {
  productosMasVendidos: Producto[] = [];

  ngOnInit(): void {
    this.productosMasVendidos = [
      {
        nombre: 'Samsung Galaxy S21',
        precio: 799,
        imagen: 'assets/productos/galaxy-s21.png',
        valoracion: 4.5,
        opiniones: 340,
        descuento: 10   
      },
      {
        nombre: 'MacBook Pro 16"',
        precio: 2499,
        imagen: 'assets/productos/macbook-pro.png',
        valoracion: 4.8,
        opiniones: 210,
        descuento: 15   
      },
      {
        nombre: 'PlayStation 5',
        precio: 499,
        imagen: 'assets/productos/ps5.png',
        valoracion: 4.7,
        opiniones: 520
      },
      {
        nombre: 'LG OLED TV 55"',
        precio: 1499,
        imagen: 'assets/productos/lg-oled-tv.png',
        valoracion: 4.9,
        opiniones: 110
      },
      {
        nombre: 'Xiaomi Mi Band 8',
        precio: 49,
        imagen: 'assets/productos/mi-band-8.png',
        valoracion: 4.4,
        opiniones: 860
      },
      {
        nombre: 'Aspirador Dyson V11',
        precio: 599,
        imagen: 'assets/productos/dyson-v11.png',
        valoracion: 4.6,
        opiniones: 190
      },
      {
        nombre: 'Auriculares Sony WH-1000XM5',
        precio: 419,
        imagen: 'assets/productos/sony-xm5.png',
        valoracion: 4.9,
        opiniones: 305
      },
      {
        nombre: 'Teclado Mecánico Logitech G Pro',
        precio: 129,
        imagen: 'assets/productos/logitech-gpro.png',
        valoracion: 4.8,
        opiniones: 275
      }
    ];
  }
}
