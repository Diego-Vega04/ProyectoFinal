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
  selector: 'app-basado-navegacion',
  templateUrl: './basado-navegacion.component.html',
  styleUrls: ['./basado-navegacion.component.css'],
  imports: [CommonModule]
})
export class BasadoNavegacionComponent implements OnInit {
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  productos: Producto[] = [];

  ngOnInit(): void {
    this.productos  = [
      {
        nombre: 'Smartwatch Amazfit GTS 4',
        precio: 179,
        imagen: 'assets/productos/amazfit-gts4.png',
        descuento: 25,
        valoracion: 4.6,
        opiniones: 455,
      },
      {
        nombre: 'iPhone 13 128GB',
        precio: 759,
        imagen: 'assets/productos/iphone-13.png', 
        valoracion: 4.7,
        opiniones: 820,
      },
      {
        nombre: 'Nintendo Switch OLED',
        precio: 349,
        imagen: 'assets/productos/nintendo-oled.png',
        descuento: 15,
        valoracion: 4.9,
        opiniones: 1105,
      },
      {
        nombre: 'Robot Aspirador Roomba i7+',
        precio: 649,
        imagen: 'assets/productos/roomba-i7.png', 
        valoracion: 4.5,
        opiniones: 275,
      },
      {
        nombre: 'Cámara GoPro Hero 11',
        precio: 429,
        imagen: 'assets/productos/gopro-hero11.png',
        descuento: 20,
        valoracion: 4.8,
        opiniones: 680,
      },
      {
        nombre: 'Monitor Gaming LG UltraGear 27"',
        precio: 299,
        imagen: 'assets/productos/lg-ultragear.png',
        descuento: 18,
        valoracion: 4.6,
        opiniones: 520,
      },
      {
        nombre: 'Altavoz Inteligente Echo Dot 5',
        precio: 34.99,
        imagen: 'assets/productos/echo-dot-5.png',
        descuento: 35,
        valoracion: 4.7,
        opiniones: 1200,
      },
      {
        nombre: 'Tablet Samsung Galaxy Tab S8',
        precio: 699,
        imagen: 'assets/productos/galaxy-tab-s8.png',
        descuento: 12,
        valoracion: 4.5,
        opiniones: 430,
      },
    ];
    
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -220, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 220, behavior: 'smooth' });
  }
}
