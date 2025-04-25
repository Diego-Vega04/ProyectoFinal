import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Producto {
  nombre: string;
  precio: number;
  imagen: string;
  descuento?: number;
  valoracion: number;
  opiniones: number;
}

@Component({
  selector: 'app-ofertas-destacadas',
  templateUrl: './ofertas-destacadas.component.html',
  styleUrls: ['./ofertas-destacadas.component.css'],
  imports: [CommonModule]
})
export class OfertasDestacadasComponent implements OnInit {
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  productos: Producto[] = [];

  ngOnInit(): void {
    this.productos = [
      {
        nombre: 'Samsung Galaxy A25',
        precio: 229,
        imagen: 'assets/productos/galaxy-a25.png',
        descuento: 30,
        valoracion: 4.5,
        opiniones: 211,
      },
      {
        nombre: 'Portátil HP Ryzen 7',
        precio: 599,
        imagen: 'assets/productos/hp-ryzen.png',
        descuento: 20,
        valoracion: 4.3,
        opiniones: 152,
      },
      {
        nombre: 'Auriculares Sony WH-1000XM5',
        precio: 349,
        imagen: 'assets/productos/sony-headphones.png',
        descuento: 15,
        valoracion: 4.8,
        opiniones: 320,
      },
      {
        nombre: 'Aspirador Dyson V11',
        precio: 599,
        imagen: 'assets/productos/dyson-v11.png',
        valoracion: 4.6,
        opiniones: 190,
      },
      {
        nombre: 'Auriculares Sony WH-1000XM5',
        precio: 419,
        imagen: 'assets/productos/sony-xm5.png',
        valoracion: 4.9,
        opiniones: 305,
      },
      {
        nombre: 'Teclado Mecánico Logitech G Pro',
        precio: 129,
        imagen: 'assets/productos/logitech-gpro.png',
        valoracion: 4.8,
        opiniones: 275,
      }
    ];
  }

  scrollLeft() {
    const container = this.slider.nativeElement;
    container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' }); // Desplazamiento 1 ancho completo del contenedor
  }

  scrollRight() {
    const container = this.slider.nativeElement;
    container.scrollBy({ left: container.clientWidth, behavior: 'smooth' }); // Desplazamiento 1 ancho completo del contenedor
  }
}
